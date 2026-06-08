import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Send, Trash2, Bot, User, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { useChatStore } from "../../store/chatStore";
import { getChatHistory, sendMessage, deleteChatHistory } from "../../services/jobChatApi";
import { Input } from "../ui/Input";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

export default function JobChatBox() {
  const queryClient = useQueryClient();
  const { isOpen, jobId, jobTitle, companyName, closeChat } = useChatStore();
  const [content, setContent] = useState("");
  const scrollRef = useRef(null);

  const { data: history, isLoading } = useQuery({
    queryKey: ["chat-history", jobId],
    queryFn: () => getChatHistory(jobId),
    enabled: !!jobId && isOpen,
  });

  const sendMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(["chat-history", jobId]);
    },
    onError: (err, variables) => {
      toast.error(err.message || "Failed to send message");
      // Restore content so user can try again
      if (variables.message) {
        setContent(variables.message);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteChatHistory(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries(["chat-history", jobId]);
      toast.success("Chat history cleared");
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, sendMutation.isPending]);

  if (!isOpen || !jobId) return null;

  const handleSend = (e) => {
    e.preventDefault();
    const message = content.trim();
    if (!message || sendMutation.isPending) return;
    
    setContent(""); // Clear immediately for better UX
    sendMutation.mutate({ jobId, message });
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 flex flex-col z-[100] shadow-2xl rounded-2xl border border-[var(--color-border)] bg-white overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
      {/* Dynamic Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-brand-blue/10 to-brand-teal/10 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />
      
      {/* Header */}
      <div className="relative bg-linear-to-r from-[var(--color-brand-blue)] to-[var(--color-brand-teal)] p-4 text-white flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/10">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
            </div>
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-sm truncate leading-tight tracking-tight">{jobTitle}</h3>
            <p className="text-[10px] uppercase font-semibold tracking-wider text-white/70 truncate">{companyName}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => {
              if (window.confirm("Clear chat history?")) deleteMutation.mutate();
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
            title="Clear history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button 
            onClick={closeChat}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[350px] max-h-[450px] bg-slate-50/50 backdrop-blur-xs scroll-smooth"
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[350px] text-slate-400 gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-slate-200 border-t-brand-teal animate-spin" />
              <Bot className="absolute inset-0 m-auto w-5 h-5 text-slate-300" />
            </div>
            <p className="text-xs font-medium animate-pulse">Consulting AI advisor...</p>
          </div>
        ) : !history?.data || history?.data?.length === 0 ? (
          <div className="text-center py-12 px-6">
            <div className="w-16 h-16 bg-linear-to-tr from-brand-blue/5 to-brand-teal/5 text-brand-teal rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xs border border-brand-teal/10">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">Instant Insights</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ask about specifically for this job's salary, remote policy, or technical requirements.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
               <button 
                onClick={() => setContent("What is the salary range for this role?")}
                className="text-[10px] bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-all shadow-xs"
               >
                 Salary range?
               </button>
               <button 
                onClick={() => setContent("What are the key technical requirements?")}
                className="text-[10px] bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:border-brand-teal hover:text-brand-teal transition-all shadow-xs"
               >
                 Key requirements?
               </button>
            </div>
          </div>
        ) : (
          history?.data?.map((msg, idx) => (
            <div 
              key={idx}
              className={`flex ${msg.role === "human" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`}
            >
              <div className={`flex gap-2.5 max-w-[88%] ${msg.role === "human" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center shadow-xs border ${
                  msg.role === "human" 
                    ? "bg-slate-100 text-slate-500 border-slate-200" 
                    : "bg-linear-to-br from-brand-blue to-brand-teal text-white border-white/10"
                }`}>
                  {msg.role === "human" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${
                  msg.role === "human" 
                    ? "bg-[var(--color-brand-blue)] text-white rounded-tr-none" 
                    : "bg-white border border-[var(--color-border)] text-slate-700 rounded-tl-none font-medium"
                }`}>
                  <div className={`prose prose-sm max-w-none ${msg.role === "human" ? "prose-invert" : ""}`}>
                    <ReactMarkdown 
                      components={{
                        p: ({ children }) => <p className="mb-0 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc ml-4 my-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal ml-4 my-2">{children}</ol>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        {sendMutation.isPending && (
          <div className="flex justify-start">
            <div className="flex gap-2.5 max-w-[88%]">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-blue to-brand-teal text-white flex items-center justify-center border border-white/10 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[var(--color-border)] text-slate-400 rounded-tl-none shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-slate-200 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-[var(--color-border)] bg-white relative">
        <div className="flex gap-2.5">
          <div className="flex-1">
            <Input 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your question..."
              className="pr-4 border-slate-200 focus:border-brand-teal focus:ring-brand-teal/20"
              disabled={sendMutation.isPending}
            />
          </div>
          <button 
            type="submit" 
            disabled={!content.trim() || sendMutation.isPending}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-linear-to-br from-brand-blue to-brand-teal text-white shadow-lg shadow-brand-blue/20 hover:shadow-brand-blue/30 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none"
          >
            {sendMutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
