-- CreateTable
CREATE TABLE "conversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gmail_messages" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gmailId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "snippet" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gmail_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_events" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "attendees" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "calendar_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corsair_integrations" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "dek" TEXT,

    CONSTRAINT "corsair_integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corsair_accounts" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenant_id" TEXT NOT NULL,
    "integration_id" TEXT NOT NULL,
    "config" JSONB NOT NULL DEFAULT '{}',
    "dek" TEXT,

    CONSTRAINT "corsair_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corsair_entities" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_id" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "corsair_entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "corsair_events" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "account_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "payload" JSONB NOT NULL DEFAULT '{}',
    "status" TEXT,

    CONSTRAINT "corsair_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "conversation_userId_idx" ON "conversation"("userId");

-- CreateIndex
CREATE INDEX "message_conversationId_idx" ON "message"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "gmail_messages_gmailId_key" ON "gmail_messages"("gmailId");

-- CreateIndex
CREATE INDEX "gmail_messages_userId_idx" ON "gmail_messages"("userId");

-- CreateIndex
CREATE INDEX "gmail_messages_receivedAt_idx" ON "gmail_messages"("receivedAt");

-- CreateIndex
CREATE UNIQUE INDEX "calendar_events_eventId_key" ON "calendar_events"("eventId");

-- CreateIndex
CREATE INDEX "calendar_events_userId_idx" ON "calendar_events"("userId");

-- CreateIndex
CREATE INDEX "calendar_events_startTime_idx" ON "calendar_events"("startTime");

-- AddForeignKey
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gmail_messages" ADD CONSTRAINT "gmail_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corsair_accounts" ADD CONSTRAINT "corsair_accounts_integration_id_fkey" FOREIGN KEY ("integration_id") REFERENCES "corsair_integrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corsair_entities" ADD CONSTRAINT "corsair_entities_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "corsair_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "corsair_events" ADD CONSTRAINT "corsair_events_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "corsair_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
