if [ ! -f .env.local ]; then
    echo "Error: .env.local file not found."
    exit 1
fi

source .env.local

if [ -z "$NUXT_API_URL" ]; then
    echo "Error: NUXT_API_URL is not set in .env.local."
    exit 1
fi

# Open a new terminal window with a tab for the SST dev process, one
# for nuxt dev process and one for the firebase emulator.
yarn ttab -w 'clear; yarn dev'
yarn ttab 'clear; yarn firebase'
yarn ttab 'clear; yarn workspace @chatsum/app dev'
yarn ttab 'clear; source .env.local; stripe listen --forward-to "$NUXT_API_URL/stripe/webhook"'
