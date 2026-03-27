import { useEffect, useState } from 'react';
import { queryAiChatbot } from '../../api/chatbot';
import botIcon from '../../image/bot.svg';


type Message = {
  role: 'user' | 'bot';
  text: string;
};

type Mode = 'faq' | 'itens' | null;

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [awaitingMode, setAwaitingMode] = useState(true);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Carregar sessão
  useEffect(() => {
    const saved = sessionStorage.getItem('chatbot_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      setMessages(parsed.messages || []);
      setMode(parsed.mode || null);
      setAwaitingMode(parsed.awaitingMode ?? true);
    }
  }, []);

  // 🔹 Persistir sessão
  useEffect(() => {
    sessionStorage.setItem(
      'chatbot_state',
      JSON.stringify({ messages, mode, awaitingMode })
    );
  }, [messages, mode, awaitingMode]);

  function handleSelectMode(selectedMode: Mode) {
    setMode(selectedMode);
    setAwaitingMode(false);

    setMessages((prev) => [
      ...prev,
      {
        role: 'bot',
        text:
          selectedMode === 'faq'
            ? 'Você selecionou FAQ. Qual sua dúvida?'
            : 'Você selecionou itens. Como posso ajudar?',
      },
    ]);
  }

  async function handleSend() {
    if (!question || !mode) return;

    const userMsg: Message = { role: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await queryAiChatbot(question, mode);

      const botMsg: Message = {
        role: 'bot',
        text: res.answer,
      };

      const followUpMsg: Message = {
        role: 'bot',
        text: 'Sobre qual tema é sua próxima pergunta?',
      };

      setMessages((prev) => [...prev, botMsg, followUpMsg]);

      // 🔥 força nova escolha de tema
      setAwaitingMode(true);
      setMode(null);

    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Erro ao consultar o assistente.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function resetChat() {
    setMode(null);
    setAwaitingMode(true);
    setMessages([]);
    sessionStorage.removeItem('chatbot_state');
  }

  return (
    <>
      {/* BOTÃO FLUTUANTE */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700 transition"
      >
        <img src={botIcon} alt="Chatbot" className="w-12 h-12" />
      </button>

      {/* CHAT */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[500px] bg-white border rounded-lg shadow-xl flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="p-3 border-b flex justify-between items-center bg-green-600">
            <img src={botIcon} alt="Chatbot" className="w-8 h-8" />
            <span className="font-medium text-white">
              Assistente
            </span>
            <button onClick={resetChat} className="text-xs text-red-500 rounded-md p-1 bg-white border-red-500">
              Reiniciar
            </button>
          </div>

          {/* BODY */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded-md max-w-[80%] ${
                  m.role === 'user'
                    ? 'bg-green-600 text-white ml-auto'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {m.text}
              </div>
            ))}

            {loading && (
              <p className="text-xs text-gray-400">
                Pensando...
              </p>
            )}

            {/* 🔥 SELETOR DE TEMA DINÂMICO */}
            {awaitingMode && (
              <div className="space-y-2 mt-2">
                <p className="text-xs text-gray-500">
                  Escolha o tema da pergunta:
                </p>

                <button
                  onClick={() => handleSelectMode('faq')}
                  className="w-full border rounded-md py-1 text-sm hover:bg-gray-50"
                >
                  📘 Dúvidas gerais (FAQ)
                </button>

                <button
                  onClick={() => handleSelectMode('itens')}
                  className="w-full border rounded-md py-1 text-sm hover:bg-gray-50"
                >
                  🛒 Itens e anúncios
                </button>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={
                awaitingMode
                  ? 'Escolha o tema primeiro...'
                  : 'Digite sua pergunta...'
              }
              disabled={awaitingMode}
              className="flex-1 border rounded-md px-2 py-1 text-sm"
            />

            <button
              onClick={handleSend}
              disabled={!question || loading || awaitingMode}
              className="bg-green-600 text-white px-3 rounded-md disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}