import { createClient } from '@libsql/client';
import type { Client } from '@libsql/client';

const tursoUrl: string = 'libsql://weddingguestdetails-nirweddingcoordination.aws-ap-northeast-1.turso.io';
const tursoToken: string = import.meta.env.TURSO_TOKEN;

const turso: Client = createClient({
  url: tursoUrl,
  authToken: tursoToken,
});

export default turso;
