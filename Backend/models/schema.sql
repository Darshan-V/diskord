DROP SCHEMA IF EXISTS diskord CASCADE;
create schema diskord;

create table diskord.users (
    user_id                 serial primary key,
    user_name               varchar unique not null,
    password                varchar not null,
    phone                   varchar,
    email                   varchar -- ideally not null
);

-- insert 2 users
insert into diskord.users(user_name, password) values ('user1', 'password1');
insert into diskord.users(user_name, password) values ('user2', 'password2');
select * from diskord.users;


create table diskord.workspaces(
    workspace_id            serial primary key,
    workspace_name          varchar unique not null,
    admin_id                integer not null,
    created_at              timestamp default now(),

    constraint fk_workspaces_users foreign key(admin_id) references diskord.users(user_id)
);

-- insert workspaces
insert into diskord.workspaces(workspace_name, admin_id) values ('wsp1', 1);
insert into diskord.workspaces(workspace_name, admin_id) values ('wsp2', 1);
insert into diskord.workspaces(workspace_name, admin_id) values ('wsp3', 2);
insert into diskord.workspaces(workspace_name, admin_id) values ('wsp4', 2);
select * from diskord.workspaces;


create table diskord.channel_category(
    channel_category_id        serial primary key,
    channel_category_name      varchar  not null,
    workspace_id               integer,
    created_at                 timestamp default now(),
    admin_id                 integer, -- check the admin
    
    constraint fk_channel_category_workspaces foreign key (workspace_id) references diskord.workspaces(workspace_id),
    constraint fk_channel_category_users foreign key (admin_id) references diskord.users(user_id) --
);

-- insert channel categories
insert into diskord.channel_category(channel_category_name, workspace_id, admin_id) values ('Text channels', '1', 1);
insert into diskord.channel_category(channel_category_name, workspace_id, admin_id) values ('Discussion', '1', 1);
insert into diskord.channel_category(channel_category_name, workspace_id, admin_id) values ('Text channels', '2', 2);
insert into diskord.channel_category(channel_category_name, workspace_id, admin_id) values ('Discussion', '2', 2);



create table diskord.channels(
    channel_id              serial primary key,
    channel_name            varchar  not null,
    channel_category_id     integer,
    workspace_id            integer not null,
    created_at              timestamp default now(),
    admin_id                integer not null,

    constraint fk_channels_channel_category foreign key(channel_category_id) references diskord.channel_category(channel_category_id),
    constraint fk_channels_workspaces foreign key(workspace_id) references diskord.workspaces(workspace_id),
    constraint fk_channels_users foreign key(admin_id) references diskord.users(user_id)
);

-- insert inot channels
insert into diskord.channels(channel_name, channel_category_id, workspace_id, admin_id) values ('general', 1, 1, 1);
insert into diskord.channels(channel_name, channel_category_id, workspace_id, admin_id) values ('general', 2, 1, 1);
insert into diskord.channels(channel_name, channel_category_id, workspace_id, admin_id) values ('general', 3, 2, 1);

select * from  diskord.channel_category where workspace_id=1;
select * from diskord.channels where workspace_id=1;

select * from  diskord.channel_category;
select * from diskord.channels as ch left join diskord.channel_category as cat on ch.channel_category_id = cat.channel_category_id where ch.workspace_id=1;


create table diskord.user_work_spaces(
    workspace_id     integer,
    user_id          integer,

    primary key(workspace_id, user_id),
	
    constraint fk_user_work_spaces_workspaces foreign key (workspace_id) references diskord.workspaces(workspace_id),
    constraint fk_user_work_spaces_users foreign key(user_id) references diskord.users(user_id)
);

insert into diskord.user_work_spaces(workspace_id, user_id) values(1,1);
insert into diskord.user_work_spaces(workspace_id, user_id) values(2,1);
insert into diskord.user_work_spaces(workspace_id, user_id) values(1,2);


create table diskord.channel_messages(
    msg_id          serial primary key,
    msg_txt         varchar not null,
    msg_time        timestamp not null,
    sender_id       integer not null,
    channel_id      integer not null,
    log_msg         boolean default false,

    constraint fk_messages_users foreign key(sender_id) references diskord.users(user_id),
    constraint fk_messages_channels foreign key(channel_id) references diskord.channels(channel_id)
);


create table diskord.user_channels(
    user_id         integer,
    channel_id      integer,

    primary key(user_id, channel_id),
    constraint fk_user_channels_users foreign key(user_id) references diskord.users(user_id),
    constraint fk_user_channels_channels foreign key(channel_id) references diskord.channels(channel_id)
);


-- create table dm_messages(
--     msg_id serial primary key,

-- )









