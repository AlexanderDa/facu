CREATE TABLE activity(
    id serial NOT NULL,
    name character varying(200) NOT NULL,
    place character varying(250),
    activity_date date NOT NULL,
    start_time character varying(5) NOT NULL,
    finish_time character varying(5),
    type character varying(15) NOT NULL,
    require_inscription boolean,
    quota integer,
    registered integer,
    event integer NOT NULL,
    professional integer,
    CONSTRAINT pk_activity PRIMARY KEY (id)
);


CREATE TABLE assistant(
    id serial NOT NULL ,
    score integer,
    event integer NOT NULL,
    userid integer NOT NULL,
    CONSTRAINT pk_assistant PRIMARY KEY (id)
);

CREATE TABLE dbuser(
    id serial NOT NULL,
    email character varying(150) NOT NULL,
    email_status character varying(15) NOT NULL,
    password text NOT NULL,
    last_name character varying(60) NOT NULL,
    first_name character varying(60) NOT NULL,
    superadmin boolean NOT NULL,
    telephone character varying(15),
    image character varying(150),
    pass_reset_token text,
    pass_reset_token_date date,
    CONSTRAINT pk_dbuser PRIMARY KEY (id),
    CONSTRAINT uk_dbuser_email UNIQUE (email)

);


CREATE TABLE event(
    id serial NOT NULL,
    name character varying(200) NOT NULL,
    description text,
    publish_date date NOT NULL,
    event_date timestamp without time zone NOT NULL,
    was_notificated boolean,
    image character varying(150),
    CONSTRAINT pk_event PRIMARY KEY (id)
);

CREATE TABLE image(
    id serial NOT NULL,
    field character varying(10),
    type character varying(15) NOT NULL,
    fd character varying(120) NOT NULL,
    CONSTRAINT pk_image PRIMARY KEY (id)
);

CREATE TABLE professional(
    id serial NOT NULL,
    last_name character varying(50) NOT NULL,
    first_name character varying(50) NOT NULL,
    education character varying(250) NOT NULL,
    college_degree character varying(250),
    specialization character varying(100),
    experience integer,
    image character varying(150),
    CONSTRAINT pk_professional PRIMARY KEY (id)
);


CREATE TABLE score_subscription(
    id serial NOT NULL,
    score integer,
    has_subscription boolean,
    subscription_date timestamp without time zone,
    score_date timestamp without time zone,
    activity integer NOT NULL,
    userid integer NOT NULL,
    CONSTRAINT pk_score_subscription PRIMARY KEY (id)
);


CREATE TABLE work(
    id serial NOT NULL,
    name text NOT NULL,
    professional integer NOT NULL,
    CONSTRAINT pk_work PRIMARY KEY (id)
);


/********************************************************************
*                           RELATIONSHIPS                           *
********************************************************************/

alter table activity 
add constraint fk_activity_event foreign key(event) references event(id);

alter table activity 
add constraint fk_activity_professional foreign key(professional) references professional(id);

alter table assistant
add constraint fk_assistant_event foreign key(event) references event(id);

alter table assistant
add constraint fk_assistant_user foreign key(userid) references dbuser(id);

alter table score_subscription
add constraint fk_score_subscription_activity foreign key(activity) references activity(id);

alter table score_subscription
add constraint fk_score_subscription_user foreign key(userid) references dbuser(id);

alter table work
add constraint fk_work_professional foreign key(professional) references professional(id);
