export interface ClientEvent {
  telegram_id: number; first_name: string; username: string | null;
  created_at: string; session_id: string; event: string; path: string; label: string;
}

// Quote every cell and neutralise spreadsheet formulas in user-controlled text.
export function csvCell(value: string | number): string {
  const text = String(value);
  const safe = /^[\s\u0000-\u001f]*[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function clientsCsv(events: ClientEvent[], cars: {id: string; brand: string; model: string}[]): string {
  const clients = new Map<number, { latest: ClientEvent; first: string; last: string; sessions: Set<string>; actions: number; interests: Set<string> }>();
  for (const event of events) {
    let client = clients.get(event.telegram_id);
    if (!client) {
      client = { latest: event, first: event.created_at, last: event.created_at, sessions: new Set(), actions: 0, interests: new Set() };
      clients.set(event.telegram_id, client);
    }
    if (event.created_at < client.first) client.first = event.created_at;
    if (event.created_at > client.last) { client.last = event.created_at; client.latest = event; }
    client.sessions.add(event.session_id);
    client.actions++;
    if (event.event === "page" && /^\/(cars|services)\/.+/.test(event.path)) {
      const car = cars.find(item => event.path === `/cars/${item.id}`);
      client.interests.add(car ? `${car.brand} ${car.model}` : event.label || event.path);
    }
  }
  const rows: (string | number)[][] = [["Telegram ID", "Ім’я", "Нік", "Telegram", "Перший візит (UTC)", "Останній візит (UTC)", "Входи", "Дії", "Інтереси"]];
  for (const [id, client] of clients) rows.push([id, client.latest.first_name, client.latest.username || "", client.latest.username ? `https://t.me/${client.latest.username}` : "", client.first, client.last, client.sessions.size, client.actions, [...client.interests].join(" | ")]);
  return "\uFEFF" + rows.map(row => row.map(csvCell).join(";")).join("\r\n");
}
