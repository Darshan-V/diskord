drop table workspaces cascade;
drop table channel_category cascade;
drop table channels cascade;
drop table users cascade;
drop table user_work_spaces cascade;


create table users (
    user_id                 serial primary key,
    user_name               varchar unique not null,
    password                varchar not null,
    phone                   varchar,
    email                   varchar -- ideally not null
);

create table workspaces(
    workspace_id            serial primary key,
    workspace_name          varchar unique not null,
    admin_id                integer not null,
    created_at              timestamp default now(),

    constraint fk_workspaces_users foreign key(admin_id) references users(user_id)
);

create table channel_category(
    channel_group_id        serial primary key,
    channel_group_name      varchar  not null,
    workspace_id            integer,
    created_at              timestamp default now(),
    creater_id              integer,
    
    constraint fk_channel_category_workspaces foreign key (workspace_id) references workspaces(workspace_id),
    constraint fk_channel_category_users foreign key (creater_id) references users(user_id)
);

create table channels(
    channel_id              serial primary key,
    channel_name            varchar  not null,
    channel_group_id        integer not null,
    workspace_id            integer not null,
    created_at              timestamp default now(),
    creater_id              integer not null,

    constraint fk_channels_channel_category foreign key(channel_group_id) references channel_category(channel_group_id),
    constraint fk_channels_workspaces foreign key(workspace_id) references workspaces(workspace_id),
    constraint fk_channels_users foreign key(creater_id) references users(user_id)
);


create table user_work_spaces(
    workspace_id     integer,
    user_id          integer,

    primary key(workspace_id, user_id),
    constraint fk_user_work_spaces_workspaces foreign key (workspace_id) references workspaces(workspace_id),
    constraint fk_user_work_spaces_users foreign key(user_id) references users(user_id)
);

create table channel_messages(
    msg_id          serial primary key,
    msg_txt         varchar not null,
    msg_time        timestamp not null,
    sender_id       integer not null,
    channel_id      integer not null,
    log_msg         boolean default false,

    constraint fk_messages_users foreign key(sender_id) references users(user_id),
    constraint fk_messages_channels foreign key(channel_id) references channels(channel_id)
);

