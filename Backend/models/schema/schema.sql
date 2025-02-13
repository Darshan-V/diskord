DROP SCHEMA IF EXISTS diskord CASCADE;
create schema diskord;

create table diskord.users (
	id                 serial primary key,
    gmail_name         varchar,
	user_choosen_name  varchar,
    email              varchar unique,
    phone              varchar unique,
	password		   varchar
);

-- insert 2 users
insert into diskord.users(gmail_name,  email) values ('name1', 'name@gmail.com');
insert into diskord.users(gmail_name,  email) values ('name2', 'name2@gmail.com');
select * from diskord.users;

create table diskord.sessions(
    session_id         varchar,
	user_id   		   integer not null,
    created_at         timestamp default now(),
    constraint fk_users_sessions foreign key(user_id) references diskord.users(id)
);

create table diskord.workspaces(
    id                      serial primary key,
    name                    varchar unique not null,
    admin_id                integer not null,
    created_at              timestamp default now(),
    deleted                 boolean default false,
    deleted_at              timestamp,
    constraint fk_workspaces_users foreign key(admin_id) references diskord.users(id)
);

-- insert workspaces
insert into diskord.workspaces(name, admin_id) values ('wsp1', 1);
insert into diskord.workspaces(name, admin_id) values ('wsp2', 1);
insert into diskord.workspaces(name, admin_id) values ('wsp3', 2);
insert into diskord.workspaces(name, admin_id) values ('wsp4', 2);
select * from diskord.workspaces;


create table diskord.channel_category(
    id                         serial primary key,
    name                       varchar  not null,
    workspace_id               integer,
    created_at                 timestamp default now(),
    admin_id                   integer, -- check the admin
    
    constraint fk_channel_category_workspaces foreign key (workspace_id) references diskord.workspaces(id),
    constraint fk_channel_category_users foreign key (admin_id) references diskord.users(id) --
);

-- insert channel categories
insert into diskord.channel_category(name, workspace_id, admin_id) values ('Text channels', '1', 1);
insert into diskord.channel_category(name, workspace_id, admin_id) values ('Discussion', '1', 1);
insert into diskord.channel_category(name, workspace_id, admin_id) values ('Text channels', '2', 2);
insert into diskord.channel_category(name, workspace_id, admin_id) values ('Discussion', '2', 2);
select * from diskord.channel_category;


create table diskord.channels(
    id                      serial primary key,
    name                    varchar  not null,
    category_id             integer,
    workspace_id            integer not null,
    created_at              timestamp default now(),
    admin_id                integer not null,

    constraint fk_channels_channel_category foreign key(category_id) references diskord.channel_category(id),
    constraint fk_channels_workspaces foreign key(workspace_id) references diskord.workspaces(id),
    constraint fk_channels_users foreign key(admin_id) references diskord.users(id)
);

-- insert inot channels
insert into diskord.channels(name, category_id, workspace_id, admin_id) values ('general', 1, 1, 1);
insert into diskord.channels(name, category_id, workspace_id, admin_id) values ('chat', 1, 1, 1);
insert into diskord.channels(name, workspace_id, admin_id) values ('general', 1, 1);
insert into diskord.channels(name, category_id, workspace_id, admin_id) values ('general', 2, 1, 1);
insert into diskord.channels(name, category_id, workspace_id, admin_id) values ('general', 3, 2, 1);
select * from  diskord.channels;

select * from  diskord.channel_category where workspace_id=1;

select * from diskord.channels where workspace_id=1 and category_id is null;
select * from diskord.channels where workspace_id=1 and category_id is not null;


create table diskord.user_work_spaces(
    workspace_id     integer,
    user_id          integer,

    primary key(workspace_id, user_id),
	
    constraint fk_user_work_spaces_workspaces foreign key (workspace_id) references diskord.workspaces(id),
    constraint fk_user_work_spaces_users foreign key(user_id) references diskord.users(id)
);

insert into diskord.user_work_spaces(workspace_id, user_id) values(1,1);
insert into diskord.user_work_spaces(workspace_id, user_id) values(2,1);
insert into diskord.user_work_spaces(workspace_id, user_id) values(1,2);


create table diskord.channel_messages(
    id              serial primary key,
    msg_txt         varchar not null,
    msg_time        timestamp not null,
    sender_id       integer not null,
    channel_id      integer not null,
    log_msg         boolean default false,

    constraint fk_messages_users foreign key(sender_id) references diskord.users(id),
    constraint fk_messages_channels foreign key(channel_id) references diskord.channels(id)
);


create table diskord.user_channels(
    user_id         integer,
    channel_id      integer,

    primary key(user_id, channel_id),
    constraint fk_user_channels_users foreign key(user_id) references diskord.users(id),
    constraint fk_user_channels_channels foreign key(channel_id) references diskord.channels(id)
);

