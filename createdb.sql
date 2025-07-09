CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

drop table tasks;
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    answertype VARCHAR(255),
    tags VARCHAR(255),
    answer VARCHAR(255),
    score int,
    short_intro TEXT,
    intro TEXT,
    hint TEXT,
    ccorrect TEXT,
    cincorrect TEXT,
    image VARCHAR(255),
    video VARCHAR(255),
    activate VARCHAR(255),
    maxtime int,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    icon VARCHAR(255) ,
    keept BOOLEAN ,
    instruct TEXT,
    audio VARCHAR(255),

);

CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE has_tags (
    id_tag int ,
    id_object int,
    PRIMARY KEY (id_tag, id_object)

);


CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
);

CREATE TABLE calendar_events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    description TEXT
);
