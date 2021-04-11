import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Button } from 'react-native';

import { RNCamera } from 'react-native-camera';

const PendingView = () => (
	<View
		style={{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		}}
	>
		<Text style={{ fontSize: 30, color: 'red' }}>Loading...</Text>
	</View>
);

const App = () => {
	const [ image, setImage ] = useState(null);

	const takePicture = async (camera) => {
		try {
			const options = { quality: 0.9, base64: false };
			const data = await camera.takePictureAsync(options);
			setImage(data.uri);
		} catch (error) {
			console.warn(error);
		}
	};

	return (
		<View>
			{image ? (
				<View style={styles.preview}>
					<Text style={styles.camtext}>Image is present</Text>
					<Image style={styles.clicked} source={{uri: image, width: '100%', height: '80%'}} />
          <Button title="Click new image" onPress={setImage(null)}></Button>
				</View>
			) : (
				<RNCamera
					style={styles.preview}
					type={RNCamera.Constants.Type.back}
					captureAudio={false}
					flashMode={RNCamera.Constants.FlashMode.on}
					androidCameraPermissionOptions={{
						title: 'Permision to use camera',
						message: 'longer text to use camera',
						buttonPositive: 'Done',
						buttonNegative: 'Cancel'
					}}
					androidRecordAudioPermissionOptions={{
						title: 'Permision to use audio',
						message: 'longer text to use audio',
						buttonPositive: 'Done',
						buttonNegative: 'Cancel'
					}}
				>
					{({ camera, status }) => {
						if (status !== 'READY') return <PendingView />;

						return (
							<View
								style={{
									flex: 0,
									flexDirection: 'row',
									justifyContent: 'center'
								}}
							>
								<TouchableOpacity style={styles.capture} onPress={() => takePicture(camera)}>
									<Text>Take Picture</Text>
								</TouchableOpacity>
							</View>
						);
					}}
				</RNCamera>
			)}
		</View>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#0A79DF'
	},
	preview: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	capture: {
		flex: 0,
		backgroundColor: 'orange',
		padding: 20,
		alignItems: 'center'
	},
	camtext: {
		backgroundColor: '#3439DB',
		color: 'white',
		marginBottom: 10,
		width: '100%',
		textAlign: 'center',
		paddingVertical: 10,
		fontSize: 25
	},
	clicked: {
		width: 300,
		height: 300,
		borderRadius: 150
	}
});
