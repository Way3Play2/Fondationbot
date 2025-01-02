import { Client, GatewayIntentBits } from 'discord.js';  // Correct import for discord.js v14

// Create a new bot client with intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers, // Required for member updates (roles, etc.)
        GatewayIntentBits.MessageContent, // If you need message content
    ]
});


// Event: Bot is ready
client.once('ready', () => {
    console.log(`Bot is online as ${client.user.tag}`);
});

// Event: Member updates (e.g., role changes)
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    // Define the primary roles (9 roles in this case)
    const primaryRoleNames = [
        "Fondation", "Administration", "Responsable", "Community Manager", 
        "Modération en chef", "Modération", "Animateur"
    ]; 
    
    const secondaryRoleName = "Staff - FONDATION"; // The role to assign automatically

    const guild = newMember.guild; // Get the guild (server)

    // Find the secondary role
    const secondaryRole = guild.roles.cache.find(role => role.name === secondaryRoleName);

    // Check if the secondary role exists
    if (secondaryRole) {
        // Check if the user has any of the primary roles and doesn't already have the secondary role
        for (let primaryRoleName of primaryRoleNames) {
            const primaryRole = guild.roles.cache.find(role => role.name === primaryRoleName);
            
            if (primaryRole && newMember.roles.cache.has(primaryRole.id) && !newMember.roles.cache.has(secondaryRole.id)) {
                try {
                    await newMember.roles.add(secondaryRole);
                    console.log(`Added ${secondaryRoleName} to ${newMember.user.tag}`);
                    break; // Stop checking once the role is added
                } catch (error) {
                    console.error(`Failed to assign role: ${error.message}`);
                }
            }
        }
    }
});

// Replace YOUR_BOT_TOKEN with your actual bot token
client.login(TOKEN)
