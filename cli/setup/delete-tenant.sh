colorPrint() {
  echo "\033[0;36m$1\033[0m"
}

scope=mawla-team
colorPrint "This tool deletes the vercel & sanity projects."
colorPrint "Available projects:"
projects=$(vercel project ls -S mawla-team)
current_dir=$(pwd)

colorPrint "What's the name of the project you want to delete?"

read projectName

rm -rf "$projectName"
mkdir "$projectName"
ln -s "$current_dir/.git" "$current_dir/$projectName/.git"

## Linking to vercel, getting sanity ID and deleting Vercel
vercel link -S "$scope" --cwd "$projectName" -d --yes
vercel env pull ".env.production.local" -S "$scope" --cwd "$projectName" -d --yes
envFile=$(cat "$current_dir/$projectName/.env.production.local")
read -p "Are you sure you want to delete $projectName y/n" -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    [[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1 # handle exits from shell or function but don't exit interactive shell
fi

vercel project rm "$projectName" -S "$scope" --cwd "$projectName"

# SANITY

sanityProjectId=$(echo "$envFile" | grep 'NEXT_PUBLIC_SANITY_PROJECT_ID' | awk -F'=' '{print $2}' | tr -d '"')
colorPrint "Sanity ID: $sanityProjectId"

# get sanity auth token
authToken=$(sanity debug --secrets | grep 'Auth token' | cut -d \' -f2)

colorPrint "- Deleting Sanity project"
deleteUrl="https://api.sanity.io/v2021-06-07/projects/$sanityProjectId"
colorPrint "$deleteUrl"

deleteResult=$(curl --request DELETE --url "$deleteUrl" \
  -H "Authorization: Bearer $authToken")

colorPrint "Sanity delete result: $deleteResult"
rm -rf "$projectName"

colorPrint "Done!"