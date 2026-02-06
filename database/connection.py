import asyncpg
import logging
import asyncio
import ssl
from config import DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_PORT

logger = logging.getLogger(__name__)

_pool = None
_pool_lock = asyncio.Lock()

def get_ssl_context():
    ssl_ctx = ssl.create_default_context()
    ssl_ctx.check_hostname = False
    ssl_ctx.verify_mode = ssl.CERT_NONE
    return ssl_ctx

def get_db_connection_details() -> dict:
    is_pooler = str(DB_PORT) == '6543'
    params = {
        'dsn': f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}",
        'min_size': 1,
        'max_size': 5,
        'timeout': 30,
        'ssl': get_ssl_context()
    }
    if is_pooler:
        params['statement_cache_size'] = 0
    return params

async def get_pool():
    global _pool
    if _pool is None:
        async with _pool_lock:
            if _pool is None:
                params = get_db_connection_details()
                _pool = await asyncpg.create_pool(**params)
    return _pool

async def close_pool():
    global _pool
    if _pool:
        await _pool.close()
        _pool = None
