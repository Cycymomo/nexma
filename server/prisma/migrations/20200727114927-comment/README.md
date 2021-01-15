# Migration `20200727114927-comment`

This migration has been generated by Cyril at 7/27/2020, 11:49:27 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE `nexma`.`Comment` (
`id` varchar(191) NOT NULL ,
`authorId` int  ,
`postId` varchar(191)  ,
`content` varchar(191)  ,
`createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updatedAt` datetime(3) NOT NULL ,
PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci

ALTER TABLE `nexma`.`Comment` ADD FOREIGN KEY (`authorId`) REFERENCES `nexma`.`User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE `nexma`.`Comment` ADD FOREIGN KEY (`postId`) REFERENCES `nexma`.`Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200504151650-user..20200727114927-comment
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -12,8 +12,9 @@
   email     String    @unique
   password  String
   name      String?   @default("")
   posts     Post[]
+  comments  Comment[]
   createdAt DateTime  @default(now())
   updatedAt DateTime  @updatedAt
 }
@@ -23,7 +24,19 @@
   content   String?
   published Boolean   @default(false)
   author    User?     @relation(fields: [authorId], references: [id])
   authorId  Int?
+  comments  Comment[]
   createdAt DateTime  @default(now())
   updatedAt DateTime  @updatedAt
 }
+
+model Comment {
+  id        String    @id @default(cuid())
+  author    User?     @relation(fields: [authorId], references: [id])
+  authorId  Int?
+  post      Post?     @relation(fields: [postId], references: [id])
+  postId    String?
+  content   String?
+  createdAt DateTime  @default(now())
+  updatedAt DateTime  @updatedAt
+}
```

