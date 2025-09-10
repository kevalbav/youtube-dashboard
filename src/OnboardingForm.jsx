import { useEffect, useState } from 'react';
import { apiGet, apiPost } from './api';

export default function Onboarding({ onComplete }) {
  const [form, setForm] = useState({
    role: '',
    primary_goal: '',
    niche: '',
    posting_cadence: '',
    audience_desc: '',
    is_complete: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // load saved data if it exists
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await apiGet('/onboarding/me'); // 404 if not created yet
        if (mounted) {
          setForm({
            role: data.role || '',
            primary_goal: data.primary_goal || '',
            niche: data.niche || '',
            posting_cadence: data.posting_cadence || '',
            audience_desc: data.audience_desc || '',
            is_complete: data.is_complete ?? true,
          });
        }
      } catch (_) {}
      finally { if (mounted) setLoading(false); }
    })();
    return () => { mounted = false; };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await apiPost('/onboarding', form);
      onComplete?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card">Loading…</div>;

  return (
    <div className="card">
      <h1>Define Role & Purpose</h1>
      <p className="subtitle">Helps tailor your insights</p>

      <form onSubmit={submit} className="auth-form">
        <input placeholder="Role (e.g., Solo creator)"
               value={form.role}
               onChange={e=>setForm({...form, role:e.target.value})}
               required />
        <input placeholder="Primary goal (e.g., Increase retention)"
               value={form.primary_goal}
               onChange={e=>setForm({...form, primary_goal:e.target.value})}
               required />
        <input placeholder="Niche (e.g., Tech explainers)"
               value={form.niche}
               onChange={e=>setForm({...form, niche:e.target.value})} />
        <input placeholder="Posting cadence (e.g., 2/wk)"
               value={form.posting_cadence}
               onChange={e=>setForm({...form, posting_cadence:e.target.value})} />
        <textarea placeholder="Audience (one sentence)"
                  value={form.audience_desc}
                  onChange={e=>setForm({...form, audience_desc:e.target.value})} />

        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save & Continue'}</button>
      </form>
    </div>
  );
}
