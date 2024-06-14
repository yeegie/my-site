from envparse import env

env.read_envfile('.env')


class General:
    '''
    ### General settings storage
    Properties:
    * polling - startup type, accepts: true | false
    '''
    host = env.str('host', default='0.0.0.0')
    port = env.int('port', default=8000)

    _all = [host, port]
    _fields = ['host', 'port']

    @classmethod
    def __str__(cls) -> str:
        return '=== General ===\n' + '\n'.join(f"{field}: {getattr(cls, field)}" for field in cls._fields)
    

class Security:
    '''
    ### Security settings storage
    Properties:
    * secret
    * exp_time
    '''
    secret = env.str('secret')
    access_exp_minutes: int = env.int('access_exp_minutes')
    refresh_exp_days: int = env.int('refresh_exp_days')

    _all = [secret, access_exp_minutes, refresh_exp_days, secret]
    _fields = ['secret', 'access_exp_minutes', 'refresh_exp_days', 'exp_time']

    @classmethod
    def __str__(cls) -> str:
        return '=== Security ===\n' + '\n'.join(f"{field}: {getattr(cls, field)}" for field in cls._fields)
    

class DataBase:
    type = env.str('db_type')
    host = env.str('db_host')
    port = env.int('db_port')
    user = env.str('db_user')
    password = env.str('db_password')
    database = env.str('db_database')
    database_service = env.str('db_service')

    avaiable_types = ['sqlite', 'mysql', 'postgres']

    if type not in avaiable_types:
        raise ValueError(f'database type must be {avaiable_types}, your value: {type}')

    if type == 'sqlite':
        db_path = f'database/'
        db_file = database + '.sqlite3'

        connection_string = f'{type}://{db_path}{db_file}'
    else:
        if database_service == 'local':
            connection_string = f'{type}://{user}:{password}@{host}:{port}/{database}'
        elif database == 'container':
            connection_string = f'{type}://{user}:{password}@{database_service}/{database}'
        else:
            raise ValueError('.env: database_service must be "local" or "container"')

    _all = [type, host, port, user, password, database]
    _fields = ['type', 'host', 'port', 'user', 'password', 'database']

    @classmethod
    def __str__(cls) -> str:
        return '=== DataBase ===\n' + '\n'.join(f"{field}: {getattr(cls, field)}" for field in cls._fields)
    