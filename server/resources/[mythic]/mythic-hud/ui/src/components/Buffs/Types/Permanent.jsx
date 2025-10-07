import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, withTheme } from '@mui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 32,
        height: 32,
        marginBottom: 4,
        textAlign: 'center',
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 5px 16px rgba(0, 0, 0, 0.2)',
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `var(--accent-gradient, linear-gradient(90deg, #ffd700 0%, #ffb347 50%, #ff6b35 100%))`,
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 -1px 6px rgba(255, 215, 0, 0.3)',
        },
    },
    icon: {
        width: '100%',
        height: '100%',
        fontSize: 14,
        backdropFilter: 'blur(10px)',
        border: `1px solid rgba(255, 255, 255, 0.2)`,
        borderRadius: 8,
        padding: 6,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fa: {
        fontSize: '0.75rem',
        color: theme.palette.common.white,
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
        fontWeight: 500,
    },
    txt: {
        color: theme.palette.common.white,
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
        fontWeight: 600,
        lineHeight: 1,
        fontSize: (buff) =>
            Boolean(buff.override) && `${buff?.override ?? ''}`.length > 2
                ? '0.55rem'
                : '0.75rem',
    },
}));

export default withTheme(({ buff }) => {
    const classes = useStyles(buff);
    const buffDefs = useSelector((state) => state.status.buffDefs);
    const buffDef = buffDefs[buff?.buff];

    // Dynamic background color based on buff properties
    const getBuffBackground = () => {
        if (buffDef?.color) {
            // Use buff-specific color if available
            const color = buffDef.color;
            return `linear-gradient(135deg, ${color}95, ${color}85)`;
        }
        
        // Use buff name/key to determine color
        const buffKey = buff?.buff?.toLowerCase() || '';
        const buffName = buffDef?.name?.toLowerCase() || '';
        
        // Health-related buffs
        if (buffKey.includes('health') || buffKey.includes('heal') || buffKey.includes('regen') || 
            buffName.includes('health') || buffName.includes('heal') || buffName.includes('regen')) {
            return `linear-gradient(135deg, #22c55e95, #16a34a85)`; // Green
        }
        
        // Armor/Defense buffs
        if (buffKey.includes('armor') || buffKey.includes('defense') || buffKey.includes('shield') || buffKey.includes('protect') ||
            buffName.includes('armor') || buffName.includes('defense') || buffName.includes('shield') || buffName.includes('protect')) {
            return `linear-gradient(135deg, #3b82f695, #2563eb85)`; // Blue
        }
        
        // Damage/Strength buffs
        if (buffKey.includes('damage') || buffKey.includes('strength') || buffKey.includes('power') || buffKey.includes('attack') ||
            buffName.includes('damage') || buffName.includes('strength') || buffName.includes('power') || buffName.includes('attack')) {
            return `linear-gradient(135deg, #f97316a5, #ea580c85)`; // Orange
        }
        
        // Speed/Movement buffs
        if (buffKey.includes('speed') || buffKey.includes('fast') || buffKey.includes('swift') || buffKey.includes('movement') ||
            buffName.includes('speed') || buffName.includes('fast') || buffName.includes('swift') || buffName.includes('movement')) {
            return `linear-gradient(135deg, #06b6d495, #0284c785)`; // Cyan
        }
        
        // Mana/Energy buffs
        if (buffKey.includes('mana') || buffKey.includes('energy') || buffKey.includes('magic') || buffKey.includes('mp') ||
            buffName.includes('mana') || buffName.includes('energy') || buffName.includes('magic') || buffName.includes('mp')) {
            return `linear-gradient(135deg, #8b5cf695, #7c3aed85)`; // Purple
        }
        
        // Negative effects (poison, curse, debuff)
        if (buffKey.includes('poison') || buffKey.includes('curse') || buffKey.includes('debuff') || buffKey.includes('weakness') ||
            buffName.includes('poison') || buffName.includes('curse') || buffName.includes('debuff') || buffName.includes('weakness')) {
            return `linear-gradient(135deg, #ef4444a5, #dc262685)`; // Red
        }
        
        // Stealth/Invisibility buffs
        if (buffKey.includes('stealth') || buffKey.includes('invisible') || buffKey.includes('hidden') || buffKey.includes('sneak') ||
            buffName.includes('stealth') || buffName.includes('invisible') || buffName.includes('hidden') || buffName.includes('sneak')) {
            return `linear-gradient(135deg, #64748b95, #475569a5)`; // Gray
        }
        
        // Fire-related buffs
        if (buffKey.includes('fire') || buffKey.includes('burn') || buffKey.includes('flame') ||
            buffName.includes('fire') || buffName.includes('burn') || buffName.includes('flame')) {
            return `linear-gradient(135deg, #dc262695, #b91c1c85)`; // Red-Orange
        }
        
        // Ice/Cold buffs
        if (buffKey.includes('ice') || buffKey.includes('cold') || buffKey.includes('freeze') || buffKey.includes('frost') ||
            buffName.includes('ice') || buffName.includes('cold') || buffName.includes('freeze') || buffName.includes('frost')) {
            return `linear-gradient(135deg, #0ea5e995, #0284c785)`; // Ice Blue
        }
        
        // Default based on buff type if available
        if (buffDef?.type === 'positive' || buffDef?.beneficial) {
            return `linear-gradient(135deg, #22c55e95, #16a34a85)`; // Green
        } else if (buffDef?.type === 'negative' || buffDef?.harmful) {
            return `linear-gradient(135deg, #ef4444a5, #dc262685)`; // Red
        } else if (buffDef?.type === 'neutral' || buffDef?.passive) {
            return `linear-gradient(135deg, #3b82f695, #2563eb85)`; // Blue
        }
        
        // Final fallback - use a hash of the buff name for consistent colors
        const hash = (buffKey + buffName).split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        
        const colors = [
            `linear-gradient(135deg, #8b5cf695, #7c3aed85)`, // Purple
            `linear-gradient(135deg, #ec4899a5, #db277785)`, // Pink
            `linear-gradient(135deg, #10b98195, #059669a5)`, // Emerald
            `linear-gradient(135deg, #f59e0b95, #d97706a5)`, // Amber
            `linear-gradient(135deg, #8b5cf695, #7c3aed85)`, // Violet
        ];
        
        return colors[Math.abs(hash) % colors.length];
    };

    // Dynamic accent bar color based on buff type
    const getAccentBarGradient = () => {
        if (buffDef?.color) {
            const color = buffDef.color;
            return `linear-gradient(90deg, ${color} 0%, ${color}dd 50%, ${color}bb 100%)`;
        }
        
        const buffKey = buff?.buff?.toLowerCase() || '';
        const buffName = buffDef?.name?.toLowerCase() || '';
        
        // Match the background color logic for accent bar
        if (buffKey.includes('health') || buffKey.includes('heal') || buffKey.includes('regen') || 
            buffName.includes('health') || buffName.includes('heal') || buffName.includes('regen')) {
            return `linear-gradient(90deg, #22c55e 0%, #16a34a 50%, #15803d 100%)`;
        }
        
        if (buffKey.includes('armor') || buffKey.includes('defense') || buffKey.includes('shield') || buffKey.includes('protect') ||
            buffName.includes('armor') || buffName.includes('defense') || buffName.includes('shield') || buffName.includes('protect')) {
            return `linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)`;
        }
        
        if (buffKey.includes('damage') || buffKey.includes('strength') || buffKey.includes('power') || buffKey.includes('attack') ||
            buffName.includes('damage') || buffName.includes('strength') || buffName.includes('power') || buffName.includes('attack')) {
            return `linear-gradient(90deg, #f97316 0%, #ea580c 50%, #dc2626 100%)`;
        }
        
        if (buffKey.includes('speed') || buffKey.includes('fast') || buffKey.includes('swift') || buffKey.includes('movement') ||
            buffName.includes('speed') || buffName.includes('fast') || buffName.includes('swift') || buffName.includes('movement')) {
            return `linear-gradient(90deg, #06b6d4 0%, #0284c7 50%, #0369a1 100%)`;
        }
        
        if (buffKey.includes('mana') || buffKey.includes('energy') || buffKey.includes('magic') || buffKey.includes('mp') ||
            buffName.includes('mana') || buffName.includes('energy') || buffName.includes('magic') || buffName.includes('mp')) {
            return `linear-gradient(90deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)`;
        }
        
        if (buffKey.includes('poison') || buffKey.includes('curse') || buffKey.includes('debuff') || buffKey.includes('weakness') ||
            buffName.includes('poison') || buffName.includes('curse') || buffName.includes('debuff') || buffName.includes('weakness')) {
            return `linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)`;
        }
        
        if (buffKey.includes('stealth') || buffKey.includes('invisible') || buffKey.includes('hidden') || buffKey.includes('sneak') ||
            buffName.includes('stealth') || buffName.includes('invisible') || buffName.includes('hidden') || buffName.includes('sneak')) {
            return `linear-gradient(90deg, #64748b 0%, #475569 50%, #334155 100%)`;
        }
        
        if (buffKey.includes('fire') || buffKey.includes('burn') || buffKey.includes('flame') ||
            buffName.includes('fire') || buffName.includes('burn') || buffName.includes('flame')) {
            return `linear-gradient(90deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)`;
        }
        
        if (buffKey.includes('ice') || buffKey.includes('cold') || buffKey.includes('freeze') || buffKey.includes('frost') ||
            buffName.includes('ice') || buffName.includes('cold') || buffName.includes('freeze') || buffName.includes('frost')) {
            return `linear-gradient(90deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)`;
        }
        
        // Fallback to type-based colors
        if (buffDef?.type === 'positive' || buffDef?.beneficial) {
            return `linear-gradient(90deg, #22c55e 0%, #16a34a 50%, #15803d 100%)`;
        } else if (buffDef?.type === 'negative' || buffDef?.harmful) {
            return `linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)`;
        } else if (buffDef?.type === 'neutral' || buffDef?.passive) {
            return `linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)`;
        }
        
        // Keep the default golden accent for unknown buffs
        return `linear-gradient(90deg, #ffd700 0%, #ffb347 50%, #ff6b35 100%)`;
    };

    return (
        <div 
            className={classes.container}
            style={{
                '--accent-gradient': getAccentBarGradient(),
            }}
        >
            <div 
                className={classes.icon}
                style={{
                    background: getBuffBackground(),
                }}
            >
                {Boolean(buff.override) ? (
                    <span className={classes.txt}>{buff.override}</span>
                ) : (
                    <FontAwesomeIcon
                        className={classes.fa}
                        icon={buffDef.icon}
                    />
                )}
            </div>
        </div>
    );
});
