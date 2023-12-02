import { spacing } from '@expo/styleguide-native';
import { APIV2Client } from 'api/APIV2Client';
import { Text, View, TextInput, Button, Heading, Spacer } from 'expo-dev-client-components';
import * as React from 'react';
import { useState } from 'react';
import { ScrollView } from 'react-native';

export function FeedbackFormScreen() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  async function onSubmit() {
    setSubmitting(true);
    try {
      const api = new APIV2Client();
      await api.sendOptionallyAuthenticatedApiV2Request('/feedback/expo-go-send', {
        body: {
          feedback,
          email,
        },
      });
      setSubmitted(true);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <View flex="1" align="centered">
        <Text type="InterBold">Thanks for sharing your feedback!</Text>
      </View>
    );
  }

  return (
    <View flex="1">
      <ScrollView style={{ flexGrow: 0 }} alwaysBounceVertical={false}>
        <View padding="medium" rounded="medium">
          <Text color="secondary" size="small">
            Add your feedback to help us improve this our app.
          </Text>
          <Heading size="small" style={{ marginVertical: spacing[1] }} type="InterSemiBold">
            Email (optional)
          </Heading>
          <View bg="default" border="default" rounded="medium" padding="tiny">
            <TextInput px="2" py="1" onChangeText={setEmail} placeholder="your@email.com" />
          </View>
          <Spacer.Vertical size="small" />
          <Heading size="small" style={{ marginVertical: spacing[1] }} type="InterSemiBold">
            Feedback
          </Heading>
          <View bg="default" border="default" rounded="medium">
            <TextInput multiline px="2" py="1" style={{ height: 200 }} onChangeText={setFeedback} />
          </View>
        </View>
      </ScrollView>
      <View px="medium">
        <Button.FadeOnPressContainer
          padding="tiny"
          onPress={onSubmit}
          disabled={!feedback?.length}
          bg={feedback?.length ? 'primary' : 'disabled'}>
          <Button.Text align="center" size="medium" color="primary" type="InterSemiBold">
            Submit
          </Button.Text>
        </Button.FadeOnPressContainer>
      </View>
    </View>
  );
}
