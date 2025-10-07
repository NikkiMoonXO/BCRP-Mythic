import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    Pagination,
    MenuItem,
    Avatar,
    Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import Nui from '../../util/Nui';
import { Loader } from '../../components';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: '20px',
        height: '100%',
    },
    search: {
        marginBottom: theme.spacing(2),
    },
    tableContainer: {
        boxShadow: 'none',
        backgroundColor: 'transparent',
        maxHeight: 'calc(100% - 120px)',
        overflow: 'auto',
        flex: 1,
    },
    tableRow: {
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            cursor: 'pointer',
        },
    },
    avatarCell: {
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(2),
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    pagination: {
        position: 'absolute',
        bottom: '1.5vh',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    characterName: {
        color: theme.palette.text.secondary,
    },
    noSelectLabel: {
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
    },
    sortableHeader: {
        userSelect: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        whiteSpace: 'nowrap',
    },
}));

const PlayerList = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const PER_PAGE = 15;

    const [searched, setSearched] = useState('');
    const [includeLoggedOut, setIncludeLoggedOut] = useState(true);
    const [pages, setPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [players, setPlayers] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [sortDir, setSortDir] = useState('asc');

    useEffect(() => {
        fetch();
        const interval = setInterval(() => fetch(), 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setPages(Math.ceil(players.length / PER_PAGE));
    }, [players]);

    useEffect(() => {
        let filteredPlayers = results.filter((r) => {
            const nameMatches = r.Name?.toLowerCase().includes(searched.toLowerCase());
            const accountIdMatches = r.AccountID == parseInt(searched);
            const characterNameMatches =
                r.Character &&
                `${r.Character.First ?? ''} ${r.Character.Last ?? ''}`
                    .toLowerCase()
                    .includes(searched.toLowerCase());
            const characterSidMatches = r.Character && r.Character.SID == parseInt(searched);

            return (
                (nameMatches || accountIdMatches || characterNameMatches || characterSidMatches) &&
                (r.Character || !includeLoggedOut)
            );
        });

        if (sortBy) {
            filteredPlayers.sort((a, b) => {
                const valA = getSortValue(a);
                const valB = getSortValue(b);

                if (valA < valB) return sortDir === 'asc' ? -1 : 1;
                if (valA > valB) return sortDir === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setPlayers(filteredPlayers);
    }, [results, searched, includeLoggedOut, sortBy, sortDir]);

    const getSortValue = (player) => {
        switch (sortBy) {
            case 'AccountID':
                return player.AccountID ?? 0;
            case 'Name':
                return (player.Name ?? '').toLowerCase();
            case 'Character':
                return `${player.Character?.First ?? ''} ${player.Character?.Last ?? ''}`.toLowerCase();
            case 'Source':
                return player.Source ?? 0;
            default:
                return '';
        }
    };

    const toggleSort = (column) => {
        if (sortBy === column) {
            setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(column);
            setSortDir('asc');
        }
    };

    const renderSortIcon = (column) => {
        if (sortBy !== column) return <FontAwesomeIcon icon={faSort} />;
        return <FontAwesomeIcon icon={sortDir === 'asc' ? faSortUp : faSortDown} />;
    };

    const fetch = async () => {
        setLoading(true);
        try {
            const res = await (await Nui.send('GetPlayerList', { disconnected: false })).json();
            if (res) setResults(res);
        } catch (e) {
            setResults([
                {
                    AccountID: 25,
                    Source: 10,
                    Name: 'Dr Nick',
                    Character: {
                        First: 'Walter',
                        Last: 'Western',
                        SID: 420
                    }
                },
                {
                    AccountID: 16,
                    Source: 8,
                    Name: 'Panda',
                    Character: {
                        First: 'Willy',
                        Last: 'Western',
                        SID: 180
                    }
                },
                {
                    AccountID: 3,
                    Source: 14,
                    Name: 'Viper',
                    // Character: {
                    //     First: 'Hank',
                    //     Last: 'Smith',
                    //     SID: 202
                    // }
                },
                {
                    AccountID: 12,
                    Source: 5,
                    Name: 'Echo',
                    // Character: {
                    //     First: 'Jake',
                    //     Last: 'Miller',
                    //     SID: 315
                    // }
                },
                {
                    AccountID: 8,
                    Source: 17,
                    Name: 'Nova',
                    Character: {
                        First: 'Anna',
                        Last: 'Jordan',
                        SID: 204
                    }
                },
                {
                    AccountID: 6,
                    Source: 2,
                    Name: 'Shadow',
                    Character: {
                        First: 'Tyler',
                        Last: 'Davis',
                        SID: 98
                    }
                },
                {
                    AccountID: 20,
                    Source: 19,
                    Name: 'Lynx',
                    // Character: {
                    //     First: 'Sarah',
                    //     Last: 'Bennett',
                    //     SID: 67
                    // }
                },
                {
                    AccountID: 1,
                    Source: 12,
                    Name: 'Titan',
                    // Character: {
                    //     First: 'Chris',
                    //     Last: 'Wilson',
                    //     SID: 550
                    // }
                },
                {
                    AccountID: 19,
                    Source: 20,
                    Name: 'Mercury',
                    Character: {
                        First: 'Megan',
                        Last: 'Taylor',
                        SID: 133
                    }
                },
                {
                    AccountID: 10,
                    Source: 3,
                    Name: 'Phoenix',
                    Character: {
                        First: 'David',
                        Last: 'Clark',
                        SID: 911
                    }
                },
                {
                    AccountID: 4,
                    Source: 6,
                    Name: 'Zephyr',
                    Character: {
                        First: 'Olivia',
                        Last: 'Roberts',
                        SID: 230
                    }
                },
                {
                    AccountID: 15,
                    Source: 13,
                    Name: 'Vortex',
                    Character: {
                        First: 'Brian',
                        Last: 'Martinez',
                        SID: 987
                    }
                },
                {
                    AccountID: 14,
                    Source: 16,
                    Name: 'Blaze',
                    Character: {
                        First: 'Emily',
                        Last: 'Hernandez',
                        SID: 500
                    }
                },
                {
                    AccountID: 7,
                    Source: 9,
                    Name: 'Falcon',
                    Character: {
                        First: 'Lucas',
                        Last: 'King',
                        SID: 212
                    }
                },
                {
                    AccountID: 17,
                    Source: 18,
                    Name: 'Crimson',
                    Character: {
                        First: 'Sophia',
                        Last: 'White',
                        SID: 303
                    }
                },
                {
                    AccountID: 2,
                    Source: 11,
                    Name: 'Knight',
                    Character: {
                        First: 'James',
                        Last: 'Walker',
                        SID: 678
                    }
                },
                {
                    AccountID: 13,
                    Source: 15,
                    Name: 'Oracle',
                    Character: {
                        First: 'Grace',
                        Last: 'Allen',
                        SID: 422
                    }
                },
                {
                    AccountID: 9,
                    Source: 7,
                    Name: 'Coyote',
                    Character: {
                        First: 'Samuel',
                        Last: 'Young',
                        SID: 88
                    }
                },
                {
                    AccountID: 18,
                    Source: 4,
                    Name: 'Maverick',
                    Character: {
                        First: 'Natalie',
                        Last: 'Scott',
                        SID: 59
                    }
                },
                {
                    AccountID: 11,
                    Source: 1,
                    Name: 'Raven',
                    Character: {
                        First: 'Ethan',
                        Last: 'Adams',
                        SID: 404
                    }
                }
            ]);    
        }
        setLoading(false);
    };

    const onClear = () => setSearched('');
    const onPagi = (e, p) => setPage(p);
    const handlePlayerClick = (player) => history.push(`/player/${player.Source}`);

    return (
        <div className={classes.wrapper}>
            <Grid container spacing={2} className={classes.search}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Filter"
                        value={includeLoggedOut}
                        onChange={(e) => setIncludeLoggedOut(e.target.value)}
                        InputLabelProps={{ classes: { root: classes.noSelectLabel } }}
                    >
                        <MenuItem value={false}>Show All</MenuItem>
                        <MenuItem value={true}>Logged In</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="search"
                        value={searched}
                        onChange={(e) => setSearched(e.target.value)}
                        InputLabelProps={{ classes: { root: classes.noSelectLabel } }}
                        label="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {searched != '' && (
                                        <IconButton type="button" onClick={onClear}>
                                            <FontAwesomeIcon icon={['fas', 'xmark']} />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            {loading ? (
                <Loader text="Loading" />
            ) : (
                <>
                    <TableContainer component={Paper} className={classes.tableContainer}>
                        <Table stickyHeader aria-label="player table">
                            <TableHead>
                                <TableRow style={{ userSelect: 'none' }}>
                                    <TableCell onClick={() => toggleSort('AccountID')}>
                                        <div className={classes.sortableHeader}>
                                            Account ID {renderSortIcon('AccountID')}
                                        </div>
                                    </TableCell>
                                    <TableCell onClick={() => toggleSort('Name')}>
                                        <div className={classes.sortableHeader}>
                                            Player {renderSortIcon('Name')}
                                        </div>
                                    </TableCell>
                                    <TableCell onClick={() => toggleSort('Character')}>
                                        <div className={classes.sortableHeader}>
                                            Character {renderSortIcon('Character')}
                                        </div>
                                    </TableCell>
                                    <TableCell onClick={() => toggleSort('Source')}>
                                        <div className={classes.sortableHeader}>
                                            Source {renderSortIcon('Source')}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {players.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" style={{ userSelect: 'none' }}>
                                            No results found
                                        </TableCell>
                                    </TableRow>
                                )}
                                {players
                                    .slice((page - 1) * PER_PAGE, page * PER_PAGE)
                                    .map((player) => (
                                        <TableRow
                                            key={player.AccountID}
                                            className={classes.tableRow}
                                            onClick={() => handlePlayerClick(player)}
                                        >
                                            <TableCell>{player.AccountID}</TableCell>
                                            <TableCell>{player.Name}</TableCell>
                                            <TableCell>
                                               {player.Character ? `${player.Character.First} ${player.Character.Last}` : 'Not Logged In'}
                                            </TableCell>
                                            <TableCell>{player.Source}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {pages > 1 && (
                        <div className={classes.pagination}>
                            <Pagination
                                variant="outlined"
                                shape="rounded"
                                color="primary"
                                page={page}
                                count={pages}
                                onChange={onPagi}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PlayerList;
