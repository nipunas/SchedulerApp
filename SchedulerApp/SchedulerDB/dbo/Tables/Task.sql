CREATE TABLE [dbo].[Task] (
    [TaskId]        INT            IDENTITY (1, 1) NOT NULL,
    [Summary]       NVARCHAR (200) NOT NULL,
    [Description]   NVARCHAR (MAX) NULL,
    [DueDate]       DATETIME2 (7)  NULL,
    [Completed]     BIT            NULL,
    [CreatedUserId] INT            CONSTRAINT [DF_Task_CreatedUserId] DEFAULT ((1)) NULL,
    CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([TaskId] ASC),
    CONSTRAINT [FK_Task_User] FOREIGN KEY ([CreatedUserId]) REFERENCES [dbo].[User] ([UserId])
);





