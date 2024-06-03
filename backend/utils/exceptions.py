class FileNotSent(Exception):
    '''Raised when file is None in request'''
    def __init__(self, message: str = 'File not sent'):
        self.message = message
        super().__init__(self.message)
