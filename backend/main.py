from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler

import uvicorn
from contextlib import asynccontextmanager

from database import init_database, close_database
from backend.config import General

from routers import *

from loguru import logger


LOG_OUT_FILE = 'logs/backend.log'
logger.add(LOG_OUT_FILE, rotation='10 MB', compression='zip', level='DEBUG')


@asynccontextmanager
async def lifespan(app: FastAPI):
    # scheduler = AsyncIOScheduler()
    # scheduler.add_job(SessionService.checker, 'interval', minutes=1)
    # scheduler.start()

    logger.info('[⭐] Starting app...')
    await init_database()
    yield
    logger.info('[👋] Bye')
    await close_database()


app = FastAPI(title='api', debug=True, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://127.0.0.1:3000'],
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PUT', 'DELETE'],
    allow_headers=['*'],
)

# Routes
app.include_router(auth_router, prefix='/auth', tags=['auth'])
app.include_router(user_router, prefix='/user', tags=['user'])
app.include_router(work_router, prefix='/work', tags=['work'])
app.include_router(image_router, prefix='/image', tags=['image'])
app.include_router(stack_router, prefix='/stack', tags=['stack'])

if __name__ == '__main__':
    uvicorn.run(app, host=General.host, port=General.port)