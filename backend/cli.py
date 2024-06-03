import asyncclick as click
import asyncio

from faker import Faker
from faker.providers import lorem, internet, color

from random import randint, choice

from database import init_database, close_database
from database.models import Category, Work, Stack, Link


# @click.group()
# @click.pass_context
# async def cli(ctx):
#     ctx.ensure_object(dict)

async def generate():
    faker = Faker()
    faker.add_provider(lorem)
    faker.add_provider(internet)
    faker.add_provider(color)

    emoji = ['⭐', '🤖', '📦', '🔒', '🧰', '💥', '😵‍💫', '🚀', '⚙️', '💎', '⛓', '💳', '👾']

    # Create work
    work = await Work.create(
        title=f'{faker.sentence(nb_words=randint(2, 4))} {choice(emoji)}'.replace('.', ''),
        description_short=faker.sentence(randint(5, 10)),
        description_full=faker.sentence(randint(500, 2000)),
        is_active=True,
    )

    # Generate categories
    for _ in range(randint(1, 3)):
        await Category.create(
            title=f'{faker.sentence(nb_words=randint(1, 2))} {choice(emoji)}',
            description=faker.sentence(3, 10),
            work=work,
            is_active=True,
        )

    # Generate stacks
    for _ in range(randint(0, 6)):
        luminosity = choice(['light', 'bright', 'dark'])
        gradient = f'{randint(0,360)}deg,{faker.color(luminosity=luminosity)},{faker.color(luminosity=luminosity)}'

        stack = await Stack.create(
            title=f'{faker.sentence(nb_words=1)}'.replace('.', ''),
            gradient=choice([gradient, gradient, None]),
            work=work,
        )

    # Generate urls
    for _ in range(randint(1, 2)):
        await Link.create(
            type=choice(['github', 'url']),
            url=faker.uri(),
            work=work,
        )

# python cli.py --count=6
@click.command()
@click.option('--count', type=int, default=3, help='Number of random records to generate')
async def random_fill(count: int) -> None:
    '''Generate random records in db'''
    

    await init_database()
    for _ in range(count):
        await generate()
    await close_database()

if __name__ == "__main__":
    asyncio.run(random_fill())
