﻿CREATE TABLE [dbo].[Task] (
    [TaskId]      INT            IDENTITY (1, 1) NOT NULL,
    [Summary]     NVARCHAR (200) NOT NULL,
    [Description] NVARCHAR (MAX) NULL,
    [DueDate]     DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Task] PRIMARY KEY CLUSTERED ([TaskId] ASC)
);
