// LeetCodeCustomCalendar.tsx
// Usage: <LeetCodeCustomCalendar calendarData={calendarData} darkMode={darkMode} />
import React from 'react';

const COLORS = [
  '#2d2d2d', // empty
  '#c6e48b', // 1
  '#7bc96f', // 2-3
  '#239a3b', // 4-5
  '#196127', // 6+
];

function getColor(count: number) {
  if (!count) return COLORS[0];
  if (count < 2) return COLORS[1];
  if (count < 4) return COLORS[2];
  if (count < 6) return COLORS[3];
  return COLORS[4];
}

function getMonthName(date: Date) {
  return date.toLocaleString('default', { month: 'short' });
}

function getYearCalendar(calendarData: Record<string, number>) {
  const today = new Date();
  const start = new Date(today);
  start.setFullYear(today.getFullYear() - 1);
  start.setDate(start.getDate() - start.getDay()); // start on Sunday
  const days: { date: Date; count: number }[] = [];
  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    days.push({ date: new Date(d), count: calendarData[dateStr] || 0 });
  }
  // Group into weeks (columns)
  const weeks: { date: Date; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  // Only show the last 52 weeks
  return weeks.slice(-52);
}

const LeetCodeCustomCalendar: React.FC<{ calendarData: Record<string, number>; darkMode?: boolean }> = ({ calendarData, darkMode }) => {
  const weeks = getYearCalendar(calendarData);
  let lastMonth = null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0', background: darkMode ? '#232946' : '#f3f6fc', borderRadius: 20, justifyContent: 'center', overflowX: 'auto' }}>
      {/* Calendar grid with month labels above first week of each month */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginTop: 0 }}>
        {weeks.map((week, i) => {
          const firstDay = week[0];
          const month = firstDay ? firstDay.date.getMonth() : null;
          let showGap = false;
          let showMonthLabel = false;
          if (i > 0) {
            const prevMonth = weeks[i - 1][0].date.getMonth();
            if (month !== prevMonth) showGap = true;
          } else {
            showMonthLabel = true;
          }
          if (i === 0 || (i > 0 && weeks[i - 1][0].date.getMonth() !== month)) {
            showMonthLabel = true;
          }
          return (
            <React.Fragment key={i}>
              {showGap && <div style={{ width: 10 }} />}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                {showMonthLabel && (
                  <div style={{ height: 16, marginBottom: 2, fontWeight: 600, fontSize: 12, color: darkMode ? '#fff' : '#222' }}>
                    {getMonthName(firstDay.date)}
                  </div>
                )}
                {!showMonthLabel && <div style={{ height: 16, marginBottom: 2 }} />}
                {week.map((day, j) => (
                  <div
                    key={j}
                    title={day.date.toISOString().slice(0, 10) + ': ' + day.count}
                    style={{
                      width: 10, // compact size
                      height: 10, // compact size
                      borderRadius: 2,
                      background: getColor(day.count),
                      marginBottom: 1,
                      border: '1px solid ' + (darkMode ? '#232946' : '#e0e7ef'),
                      transition: 'background 0.2s',
                    }}
                  />
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LeetCodeCustomCalendar; 