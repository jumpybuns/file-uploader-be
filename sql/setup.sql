DROP TABLE IF EXISTS uploads;

CREATE TABLE uploads (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  size INTEGER,
  type VARCHAR(25)
)