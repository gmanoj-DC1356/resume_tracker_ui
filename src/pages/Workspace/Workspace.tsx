import { ChatPanel } from '@/components/chat/ChatPanel';
import { InterviewBanner } from '@/components/highlights/InterviewBanner';
import { HistorySidebar } from '@/components/history/HistorySidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { ThreePaneLayout } from '@/components/layout/ThreePaneLayout';
import { JdForm } from '@/components/jd/JdForm';
import { QuestionPanel } from '@/components/questions/QuestionPanel';
import { DemoCandidateList } from '@/components/resume/DemoCandidateList';
import { ResumeViewer } from '@/components/resume/ResumeViewer';

export function Workspace() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <ThreePaneLayout
        left={
          <>
            <JdForm />
            {/* Starter list until ranked matches exist; swap back to <CandidateList /> then. */}
            <DemoCandidateList />
          </>
        }
        center={
          <>
            <ResumeViewer />
            <InterviewBanner />
            <QuestionPanel />
            <ChatPanel />
          </>
        }
        right={<HistorySidebar />}
      />
    </div>
  );
}
