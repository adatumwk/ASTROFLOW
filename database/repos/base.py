from database.connection import get_pool

class BaseRepository:
    def __init__(self, conn=None):
        self.conn = conn

    async def _get_conn(self):
        if self.conn:
            yield self.conn
        else:
            pool = await get_pool()
            async with pool.acquire() as conn:
                yield conn

    async def fetchrow(self, query, *args):
        async for conn in self._get_conn():
            return await conn.fetchrow(query, *args)

    async def fetchval(self, query, *args):
        async for conn in self._get_conn():
            return await conn.fetchval(query, *args)

    async def execute(self, query, *args):
        async for conn in self._get_conn():
            return await conn.execute(query, *args)
            
    async def fetch(self, query, *args):
        async for conn in self._get_conn():
            return await conn.fetch(query, *args)
