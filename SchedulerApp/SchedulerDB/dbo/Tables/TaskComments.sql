CREATE TABLE [dbo].[TaskComments] (
    [CommentId]     INT            IDENTITY (1, 1) NOT NULL,
    [TaskId]        INT            NOT NULL,
    [Comment]       NVARCHAR (MAX) NOT NULL,
    [AddedDateTime] DATETIME2 (7)  NOT NULL,
    [CreatedUserId] INT            NOT NULL,
    [Deleted]       BIT            NULL,
    CONSTRAINT [PK_TaskComments] PRIMARY KEY CLUSTERED ([CommentId] ASC),
    CONSTRAINT [FK_TaskComments_Task] FOREIGN KEY ([TaskId]) REFERENCES [dbo].[Task] ([TaskId]),
    CONSTRAINT [FK_TaskComments_User] FOREIGN KEY ([CreatedUserId]) REFERENCES [dbo].[User] ([UserId])
);

