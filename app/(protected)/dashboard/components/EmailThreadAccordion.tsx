import React, { useState, useEffect } from "react";
import { Mail, ChevronUp, ChevronDown, RefreshCw } from "lucide-react";

export function EmailThreadAccordion({ threadId }: { threadId: string | null | undefined }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!threadId || !isOpen || messages.length > 0) return;

    const fetchThread = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/emails/thread?threadId=${threadId}`);
        const data = await res.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Failed to load thread history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchThread();
  }, [threadId, isOpen]);

  if (!threadId) return null;

  return (
    <div className="border border-border/40 rounded-xl bg-muted/20 overflow-hidden my-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/30 transition cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          <span>View Previous Conversation History</span>
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="border-t border-border/40 p-3.5 space-y-3 max-h-60 overflow-y-auto bg-card/20">
          {loading ? (
            <div className="flex items-center justify-center py-4 gap-2 text-xs text-muted-foreground">
              <RefreshCw className="h-3 w-3 animate-spin" />
              <span>Loading thread history...</span>
            </div>
          ) : messages.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-2">No previous thread messages found.</p>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="text-xs space-y-1 pb-2 border-b border-border/30 last:border-0 last:pb-0">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground font-semibold">
                  <span className="truncate max-w-[150px]">{msg.sender}</span>
                  <span>{new Date(msg.date).toLocaleString()}</span>
                </div>
                <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap select-text">{msg.body}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
