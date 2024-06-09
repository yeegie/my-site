from tortoise import Tortoise
import time
from tortoise.exceptions import DBConnectionError
from backend.config import DataBase
from loguru import logger
import os

async def init_database():
    if DataBase.type == 'sqlite':
        db_file_exist = DataBase.db_file in os.listdir(DataBase.db_path)

    if DataBase.type == 'sqlite' and db_file_exist is False:
        db_path = DataBase.db_path
        db_file = DataBase.db_file

        with open(db_path + db_file, 'a'):
            os.utime(db_path + db_file, None)
        logger.info(f'[!] Database created {db_path + db_file}')

    time.sleep(15)

    try:
        await Tortoise.init(
            db_url=DataBase.connection_string,
            modules={'models': ['database.models']}
        )

        await Tortoise.generate_schemas()
        logger.info(f'[📦] Database({DataBase.type}) connected...')
    except DBConnectionError as ex:
        time.sleep(10)
        logger.warning(f'Data base connection error to {DataBase.connection_string}. Retry after 10 sec')
        logger.warning(ex)
        await init_database()
    except Exception as ex:
        logger.critical(f'DATABASE CONNECTION ERROR: {str(ex)}')


async def close_database():
    await Tortoise.close_connections()
    logger.info('[X] Database connection close!')