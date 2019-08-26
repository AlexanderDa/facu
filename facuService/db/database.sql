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
