"""create users table

Revision ID: fa7e84a0289a
Revises: 
Create Date: 2023-10-04 11:32:46.112044

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa7e84a0289a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('filmmakers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('theatres',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('ticket_price', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('films',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('filmmaker_id', sa.Integer(), nullable=True),
    sa.Column('theatre_id', sa.Integer(), nullable=True),
    sa.Column('duration', sa.Integer(), nullable=True),
    sa.Column('screening_time', sa.DateTime(), nullable=True),
    sa.Column('tickets_available', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['filmmaker_id'], ['filmmakers.id'], ),
    sa.ForeignKeyConstraint(['theatre_id'], ['theatres.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('films')
    op.drop_table('theatres')
    op.drop_table('filmmakers')
    # ### end Alembic commands ###