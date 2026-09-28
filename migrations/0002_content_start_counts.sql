CREATE TABLE IF NOT EXISTS content_start_counts (
  content_id TEXT PRIMARY KEY,
  starts INTEGER NOT NULL DEFAULT 0 CHECK (starts >= 0)
);
