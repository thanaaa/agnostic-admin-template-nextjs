import { createClient } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const client = createClient(

  );
  const search = searchParams.q ?? '';

  try {
    const result = await client.query(`
      SELECT id, name, username, email 
      FROM users 
      WHERE name ILIKE $1;
    `, [`%${search}%`]);

    const users = result.rows as User[];

    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Users</Title>
        <Text>A list of users retrieved from a Postgres database.</Text>
        <Search />
        <Card className="mt-6">
          <UsersTable users={users} />
        </Card>
      </main>
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Users</Title>
        <Text>Failed to retrieve users from the database.</Text>
      </main>
    );
  }
}
