import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export type Movie = {
    id: string;
    title: string;
    genre: string;
    year: number;
    rating: number;
    poster: string;
    isWatched: boolean;
};

export type MovieCardProps = {
    movie: Movie;
    layout?: 'row' | 'tile';
    onSelect: (id: string) => void;
};

function MovieCard({
    movie,
    layout = 'row',
    onSelect,
}: MovieCardProps) {
    const isTile = layout === 'tile';

    return (
        <TouchableOpacity
            style={[styles.card, isTile && styles.cardTile]}
            onPress={() => onSelect(movie.id)}
        >
            <View style={isTile ? styles.imageBox : undefined}>
                <Image
                    source={{ uri: movie.poster }}
                    style={[styles.poster, isTile && styles.posterTile]}
                />

                {isTile && (
                    <Text style={styles.badge}>
                        ⭐ {movie.rating.toFixed(1)}
                    </Text>
                )}
            </View>

            <View style={styles.info}>
                <Text
                    style={styles.title}
                    numberOfLines={isTile ? 1 : 2}
                >
                    {movie.title}
                </Text>

                {!isTile && (
                    <>
                        <Text>
                            {movie.genre} - {movie.year}
                        </Text>

                        <Text>
                            ⭐ {movie.rating.toFixed(1)}
                        </Text>
                    </>
                )}

                <Text>
                    {movie.isWatched
                        ? '✅ Đã xem'
                        : '⏳ Chưa xem'}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 8,
        marginBottom: 10,
    },

    cardTile: {
        flexDirection: 'column',
        padding: 0,
    },

    poster: {
        width: 70,
        height: 100,
    },

    posterTile: {
        width: '100%',
        height: undefined,
        aspectRatio: 2 / 3,
    },

    imageBox: {
        width: '100%',
    },

    badge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'black',
        color: 'white',
    },

    info: {
        flex: 1,
        padding: 8,
    },

    title: {
        fontWeight: 'bold',
    },
});