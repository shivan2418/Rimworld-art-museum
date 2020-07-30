from datetime import datetime
import sys
import logging

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy_utils.functions import database_exists

from elutils.osio import list_files
from elutils.osio import write_json

DATABASE_PATH = 'rimworld.sqlite3'

def loadSession():
    """"""
    metadata = Base.metadata
    Session = sessionmaker(bind=db)
    session = Session()
    return session


if database_exists('sqlite:///{}'.format((DATABASE_PATH))):
    db = create_engine('sqlite:///{}'.format((DATABASE_PATH)))
else:
    logging.error('No database found at {}. Aborting script'.format((DATABASE_PATH)))
    logging.info('End of DOI script')
    sys.exit()

Base = declarative_base(db)


class Artist(Base):
    __tablename__ = 'rimworld_artists'
    __table_args__ = {"autoload":True}

class Art(Base):
    __tablename__ = 'rimworld_art'
    __table_args__ = {"autoload": True}

    def as_dict(self):
        temp= {c.name: getattr(self, c.name) for c in self.__table__.columns}
        return_dict = {}
        for key,value in temp.items():
            if isinstance(value,datetime):
                value=str(value)
            return_dict[key]=value
        return return_dict


class Post(Base):
    __tablename__ = 'reddit_posts'
    __table_args__ = {"autoload":True}


s = loadSession()

files = list_files('images')



file_details = s.query(Art).filter(Art.file_name.in_(files)).all()

ds = [f.as_dict() for f in file_details]

write_json(ds, 'poor_mans_db.json')

print(file_details)