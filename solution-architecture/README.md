# Solution  Architecture

### Features

##### Microservice
- Auth Service (Login)
- User Service (Collect user details)
- Content Service (Upload/Resize/Store)
- Feed Service (Creating feed for any user)
- Interaction Service (Like/Comment/Notify)
- Messaging Service (Process Chat between user)
- Notification Service (Process notification with Phone/Email)
- Analytics Service (Process Analytic)

(All services covered by API gateway)

##### Database 
- User DB
- Content DB
- Feed DB (Optimized Feed Store)
- Interaction DB (Likes/Comments)
- Messaging DB 
- Analytics DB

##### Storage
- store static assets (image/video)

##### Queue System 
- AWS SQS for async processing (uploads, email, notifications, analytics)

##### Worker Services
- Media Processor (resize, reformat)
- Notification Worker
- Analytics Processor

##### Tool
- Hosting: AWS ECS
- DB: AWS RDS
- Gateway: AWS API Gateway
- Storage: AWS S3
- Queue: AWS SQS
- Notification: Amazon SNS, Amazon SES
- Analytic: Amazon CloudWatch, Amazon Athena
- Serverless: AWS Lambda (to process with SNS, SES, Cloudwatch, Athena, S3)


### Pros
- Fast to initialize due to the use of third-party services.
- Capable of automatically scaling for each service.
- Easy to maintain with separate responsibilities aligned with the business domain. 
- Async process supports peak loads.

## Cons
- Using a lot of cost because of using various third-party services.

