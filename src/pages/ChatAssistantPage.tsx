import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { ChatMessage } from '../types/legal';
import { askSaloneLawAI } from '../services/aiService';
import { FirstCounselView } from '../components/FirstCounselView';
import { CounselHomeView } from '../components/CounselHomeView';
import { TheAnswerView } from '../components/TheAnswerView';
import { TricolourBar } from '../components/TricolourBar';

interface Props {
  apiKey: string;
  onBookmarkItem: (item: any) => void;
  onOpenLibraryCategory: (cat: string) => void;
}

export const ChatAssistantPage: React.FC<Props> = ({
  apiKey,
  onBookmarkItem,
  onOpenLibraryCategory,
}) => {
  // Navigation states: 'home' (Counsel Home) | 'answer' (The Answer) | 'welcome' (First Counsel)
  const [viewState, setViewState] = useState<'home' | 'answer' | 'welcome'>('home');
  const [currentQuestion, setCurrentQuestion] = useState('Is a statement obtained by threat admissible in court?');
  
  const [currentAnswer, setCurrentAnswer] = useState<ChatMessage>({
    id: 'sample-ans-1',
    sender: 'ai',
    text: `A confession or statement extracted through threat, duress, torture, or undue coercion violates **Section 28(1) of the 1991 Constitution** and the **Judges' Rules** applicable in Sierra Leone courts.

Such statements are strictly inadmissible in evidence. In criminal proceedings, if the defence raises an objection that a statement was made under duress, the trial judge or magistrate must conduct a **trial-within-a-trial (voir dire)** to determine voluntariness. The burden remains on the prosecution to prove voluntariness beyond reasonable doubt.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    citations: [
      {
        type: 'constitution',
        title: 'CONSTITUTION OF SIERRA LEONE, 1991',
        section: 'SECTION 28(1)',
        snippet: '“No person who is arrested or detained shall be subjected to torture or to inhuman or degrading treatment.”',
      },
    ],
    similarCases: [
      {
        caseTitle: 'R v. Kanu (Criminal Assizes, Freetown)',
        citation: '2012 SLCA 17',
        year: 2012,
        summary: 'Voluntariness of confession statements recorded during police custody.',
        ratio: 'Statement obtained by threats ruled inadmissible in evidence.',
      },
    ],
    followUpQuestions: [
      'What counts as an unlawful threat under Sierra Leone law?',
      'How do I raise a formal objection during trial?',
      'What are the legal steps for conducting a voir dire?',
    ],
  });

  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const handleAskQuestion = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    setCurrentQuestion(queryText.trim());
    setLoading(true);
    setViewState('answer');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...chatHistory, userMsg];
    setChatHistory(updatedHistory);

    try {
      const response = await askSaloneLawAI(queryText, updatedHistory, apiKey);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: response.citations,
        similarCases: response.similarCases,
        followUpQuestions: response.followUpQuestions,
      };

      setCurrentAnswer(aiMsg);
      setChatHistory((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error querying legal answer:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAnswer = () => {
    onBookmarkItem({
      id: `saved-${Date.now()}`,
      type: 'case',
      title: currentQuestion,
      subtitle: 'SALONE LAW AI Counsel Ruling',
      content: currentAnswer.text,
      savedAt: new Date().toLocaleDateString(),
    });
  };

  // Screen 4: First Counsel (Welcome Screen)
  if (viewState === 'welcome') {
    return (
      <div className="py-2 px-1 flex items-center justify-center min-h-[90vh]">
        <FirstCounselView
          onBegin={() => setViewState('home')}
          onClose={() => setViewState('home')}
        />
      </div>
    );
  }

  // Screen 2: The Answer
  if (viewState === 'answer') {
    return (
      <div className="min-h-[90vh] flex items-start justify-center">
        {loading ? (
          <div className="w-full max-w-md mx-auto p-8 text-center space-y-4 bg-white rounded-3xl border border-slate-200 shadow-xl my-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mx-auto animate-pulse">
              <Scale className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#071E14]">Extracting Law & Precedents</h3>
              <p className="text-xs text-slate-500 font-serif italic">
                Cross-referencing 1991 Constitution, Statutes & Court Precedents...
              </p>
            </div>
            <TricolourBar className="h-1 w-32 mx-auto" />
          </div>
        ) : (
          <TheAnswerView
            userQuestion={currentQuestion}
            answerMessage={currentAnswer}
            onBack={() => setViewState('home')}
            onAskFollowUp={(q) => handleAskQuestion(q)}
            onSaveBookmark={handleSaveAnswer}
          />
        )}
      </div>
    );
  }

  // Screen 1: Counsel Home
  return (
    <div className="min-h-[90vh] flex items-start justify-center">
      <CounselHomeView
        onAsk={handleAskQuestion}
        onOpenLibraryCategory={onOpenLibraryCategory}
        onOpenFirstCounsel={() => setViewState('welcome')}
      />
    </div>
  );
};
