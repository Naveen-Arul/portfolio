import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface LeetCodeDashboardProps {
  darkMode: boolean;
}

const LEETCODE_USERNAME = 'NaveenA_kec';
const HARDCODED_TOTAL_QUESTIONS = 3610;

const query = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      userAvatar
      realName
    }
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    userCalendar {
      submissionCalendar
    }
    badges {
      id
      name
      icon
    }
  }
}
`;

const LeetCodeDashboard: React.FC<LeetCodeDashboardProps> = ({ darkMode }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/leetcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <section className="leetcode-section"><h2 className="section-title">LeetCode</h2><div>Loading...</div></section>;
  if (!data) return <section className="leetcode-section"><h2 className="section-title">LeetCode</h2><div>Failed to load data.</div></section>;

  const user = data.matchedUser;
  const acStats = user.submitStats.acSubmissionNum.reduce((acc: any, cur: any) => {
    acc[cur.difficulty] = cur.count;
    if (cur.difficulty === 'All') {
      acc.total = cur.count;
    }
    return acc;
  }, {});
  const totalSolved = acStats.total || 0;
  const easySolved = acStats.Easy !== undefined ? acStats.Easy : (acStats.EASY || 0);
  const mediumSolved = acStats.Medium !== undefined ? acStats.Medium : (acStats.MEDIUM || 0);
  const hardSolved = acStats.Hard !== undefined ? acStats.Hard : (acStats.HARD || 0);

  // Submission calendar
  let calendarData: { [date: string]: number } = {};
  try {
    const raw = user.userCalendar.submissionCalendar
      ? JSON.parse(user.userCalendar.submissionCalendar)
      : {};
    // Convert Unix timestamp keys to YYYY-MM-DD
    calendarData = Object.fromEntries(
      Object.entries(raw).map(([ts, count]) => [
        new Date(Number(ts) * 1000).toISOString().slice(0, 10),
        count,
      ])
    );
  } catch (e) {}
  const heatmapValues = Object.entries(calendarData).map(([date, count]) => ({ date, count }));

  return (
    <section className={`leetcode-section${darkMode ? ' dark-mode' : ''}`}
      style={{ padding: '4rem 0 2rem 0', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
      <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>LeetCode</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', width: '100%' }}>
        {/* Donut, solved count, and breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', width: '100%' }}>
          <div style={{ width: 180, height: 180, margin: '0 auto' }}>
            <CircularProgressbar
              value={totalSolved}
              maxValue={HARDCODED_TOTAL_QUESTIONS}
              text={`${totalSolved}/${HARDCODED_TOTAL_QUESTIONS}`}
              styles={buildStyles({
                textColor: darkMode ? '#fff' : '#222',
                pathColor: '#4ade80',
                trailColor: darkMode ? '#232946' : '#e0e7ef',
                textSize: '1.5rem',
                strokeLinecap: 'round',
              })}
            />
            <div style={{ marginTop: 12, fontWeight: 600, fontSize: '1.1rem', color: '#4ade80' }}>Solved</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 24, fontSize: '1.2rem', fontWeight: 500, marginTop: 8 }}>
            <div style={{ color: '#4ade80', background: darkMode ? '#1a2a2a' : '#e6f9f0', borderRadius: 10, padding: '8px 18px', minWidth: 90 }}>Easy: {easySolved}</div>
            <div style={{ color: '#facc15', background: darkMode ? '#2a261a' : '#fffbe6', borderRadius: 10, padding: '8px 18px', minWidth: 90 }}>Medium: {mediumSolved}</div>
            <div style={{ color: '#f87171', background: darkMode ? '#2a1a1a' : '#ffe6e6', borderRadius: 10, padding: '8px 18px', minWidth: 90 }}>Hard: {hardSolved}</div>
          </div>
        </div>
        {/* Badges */}
        <div style={{ margin: '0.5rem 0 0.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <strong style={{ marginBottom: 8 }}>Badges:</strong>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 16 }}>
            {user.badges.length === 0 && <span>None</span>}
            {user.badges.map((badge: any) => (
              <img
                key={badge.id}
                src={badge.icon}
                alt={badge.name}
                title={badge.name}
                width={48}
                style={{ margin: '0 10px', verticalAlign: 'middle' }}
              />
            ))}
          </div>
        </div>
        {/* Heatmap below donut */}
        <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', background: darkMode ? '#232946' : '#f3f6fc', borderRadius: 20, padding: '1.5rem 1rem 1rem 1rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ marginBottom: 12, fontWeight: 600, fontSize: '1.1rem', textAlign: 'left' }}>Submission Activity (last year):</div>
          <CalendarHeatmap
            startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
            endDate={new Date()}
            values={heatmapValues}
            classForValue={value => {
              if (!value || value.count === 0) return 'lc-empty';
              if (value.count < 2) return 'lc-scale-1';
              if (value.count < 4) return 'lc-scale-2';
              if (value.count < 6) return 'lc-scale-3';
              return 'lc-scale-4';
            }}
            showMonthLabels={true}
            showWeekdayLabels={false}
            gutterSize={2}
            horizontal={true}
            transformMonthLabel={month => <text style={{ fontSize: 12, fontWeight: 600, fill: darkMode ? '#fff' : '#222', letterSpacing: 2, marginRight: 16 }}>{month}</text>}
            style={{ width: '100%', minHeight: 120 }}
          />
          <style>{`
            .lc-empty { fill: #2d2d2d; }
            .lc-scale-1 { fill: #c6e48b; }
            .lc-scale-2 { fill: #7bc96f; }
            .lc-scale-3 { fill: #239a3b; }
            .lc-scale-4 { fill: #196127; }
            .react-calendar-heatmap .month-label { letter-spacing: 2px; font-size: 12px; font-weight: 600; fill: ${darkMode ? '#fff' : '#222'}; }
            .react-calendar-heatmap .month-label:not(:first-child) { transform: translateX(16px); }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default LeetCodeDashboard; 