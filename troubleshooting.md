# Troubleshootings

## PRISMA_MANAGEMENT_API_SECRET variable is not set

error: when I launch `npm start`, I get this error: `WARNING: The PRISMA_MANAGEMENT_API_SECRET variable is not set. Defaulting to a blank string.`
solution: you have to `cp .env.example .env` and then populate the `PRISMA_MANAGEMENT_API_SECRET`

