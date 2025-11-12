import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StateGraph, END, Annotation } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage, SystemMessage, AIMessage, ToolMessage, BaseMessage } from "@langchain/core/messages";
import { allTools } from "@/lib/tools"; // Import tools from separate file
import { RANKWISE_SYSTEM_MESSAGE } from "@/lib/systemMessage"; // Import system message

// Initialize Gemini model
const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.3,
});

// Bind tools to the model
const modelWithTools = model.bindTools(allTools);

// Define the agent state using proper Annotation
const AgentState = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
        reducer: (x, y) => x.concat(y),
        default: () => [],
    }),
});

// System message for Rankwise
const systemMessage = new SystemMessage(RANKWISE_SYSTEM_MESSAGE);



// Define agent nodes
async function callModel(state: typeof AgentState.State) {
    const messages = [systemMessage, ...state.messages];
    const response = await modelWithTools.invoke(messages);
    return { messages: [response] };
}

async function callTool(state: typeof AgentState.State) {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1] as AIMessage;
    
    if (!lastMessage.tool_calls || lastMessage.tool_calls.length === 0) {
        throw new Error("No tool calls found in the last message");
    }
    
    const toolMessages = [];
    
    for (const toolCall of lastMessage.tool_calls) {
        const tool = allTools.find(t => t.name === toolCall.name);
        if (!tool) {
            throw new Error(`Tool ${toolCall.name} not found`);
        }
        
        if (!toolCall.id) {
            throw new Error("Tool call ID is missing");
        }
        
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await (tool as any).invoke(toolCall.args);
            toolMessages.push(
                new ToolMessage({
                    content: result,
                    tool_call_id: toolCall.id,
                })
            );
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toolMessages.push(
                new ToolMessage({
                    content: `Error calling tool ${toolCall.name}: ${errorMessage}`,
                    tool_call_id: toolCall.id,
                })
            );
        }
    }
    
    return { messages: toolMessages };
}

// Define routing logic
function shouldContinue(state: typeof AgentState.State) {
    const messages = state.messages;
    const lastMessage = messages[messages.length - 1] as AIMessage;
    
    if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
        return "tools";
    }
    return END;
}

// Create the graph with proper Annotation
const workflow = new StateGraph(AgentState)
    .addNode("agent", callModel)
    .addNode("tools", callTool)
    .addEdge("__start__", "agent")
    .addConditionalEdges("agent", shouldContinue)
    .addEdge("tools", "agent");

// Compile the graph with memory
const checkpointer = new MemorySaver();
const app = workflow.compile({ checkpointer });

// App Router API Handlers
export async function POST(request: Request) {
    try {
        const { message, sessionId = 'default' } = await request.json();

        if (!message || typeof message !== 'string') {
            return Response.json({ error: 'Message is required and must be a string' }, { status: 400 });
        }

        const config = { 
            configurable: { 
                thread_id: sessionId 
            } 
        };

        // Invoke the agent
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: any = await app.invoke(
            { 
                messages: [new HumanMessage(message)] 
            }, 
            config
        );

        const lastMessage = result.messages[result.messages.length - 1];
        
        if (lastMessage instanceof AIMessage) {
            return Response.json({
                success: true,
                message: lastMessage.content,
                sessionId: sessionId
            });
        } else {
            return Response.json({
                success: false,
                error: 'Failed to get response from assistant'
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Chat API Error:', error);
        return Response.json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
    }
}

export async function GET() {
    return Response.json({ 
        message: 'KIHEAT Ranklist Chat API is running',
        status: 'healthy' 
    });
}