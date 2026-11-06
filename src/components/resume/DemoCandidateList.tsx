import { Card } from '@/components/common/Card';
import { Tag } from '@/components/common/Tag';
import { useCandidates } from '@/hooks/useCandidates';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCandidate } from '@/store/slices/candidateSlice';

const LOADING_MESSAGE = 'Loading candidates…';
const ERROR_MESSAGE = 'Candidates could not be loaded. Check that you are signed in and the API is running.';
const EMPTY_MESSAGE = 'No candidates yet.';

// STARTER LIST (pre-matching): shows candidates with no scores so a resume can be selected and
// read. Replace with the ranked candidate list once matching results are wired up; selecting a
// card must keep dispatching selectCandidate(resumeId) with the backend Resume id.
export function DemoCandidateList() {
  const { data, isPending, isError } = useCandidates();
  const dispatch = useAppDispatch();
  const selectedResumeId = useAppSelector((state) => state.candidate.selectedResumeId);

  return (
    <Card title="Candidates" className="mt-4">
      {isPending && <p role="status" className="text-sm text-brand-muted">{LOADING_MESSAGE}</p>}
      {isError && <p role="alert" className="text-sm text-brand-bad">{ERROR_MESSAGE}</p>}
      {data?.length === 0 && <p className="text-sm text-brand-muted">{EMPTY_MESSAGE}</p>}
      <ul className="m-0 list-none p-0">
        {data?.map((candidate) => {
          const selected = candidate.resumeId === selectedResumeId;
          return (
            <li key={candidate.resumeId}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => dispatch(selectCandidate(candidate.resumeId))}
                className={`mb-2 block w-full rounded-lg border p-3 text-left text-sm transition-colors ${
                  selected
                    ? 'border-brand-secondary shadow-[0_0_0_2px_var(--color-brand-secondary-soft)]'
                    : 'border-brand-line bg-white hover:bg-brand-primary-soft'
                }`}
              >
                <b>{candidate.name}</b>
                <div className="mt-1 text-brand-muted">
                  {candidate.role} · {candidate.yearsExperience} yrs
                </div>
                <div className="mt-2">
                  {candidate.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
