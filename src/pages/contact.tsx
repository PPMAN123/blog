import React from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import { Button, Icon, Input, TextArea } from 'semantic-ui-react';
import { PageProps } from 'gatsby';

const PageContainer = styled.div``;

const Title = styled.h1`
  margin: 10px 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 10px 0;
  gap: 10px;
  align-items: center;
`;

const StyledButton = styled(Button)`
  max-width: 100px;
`;

const StyledInput = styled(Input)`
  width: 60vw;
`;

const StyledTextArea = styled(TextArea)`
  width: 60vw;
`;

function encode(data: { [key: string]: string }) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

const ContactPage = ({}: PageProps) => {
  const [state, setState] = React.useState({});

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name') || '',
        ...state,
      }),
    })
      .then(() => console.log('form submitted'))
      .catch((error) => alert(error));
  };
  return (
    <PageContainer>
      <StyledForm
        name="contact form"
        method="POST"
        data-netlify="true"
        data-netlify-recaptcha="true"
        onSubmit={handleSubmit}
      >
        <Title>Contact Form</Title>
        <input type="hidden" name="form-name" value="contact-form" />
        <StyledInput iconPosition="left" placeholder="Name">
          <Icon name="user" />
          <input name="name" onChange={handleChange} />
        </StyledInput>
        <StyledInput iconPosition="left" placeholder="Email">
          <Icon name="at" />
          <input name="email" onChange={handleChange} />
        </StyledInput>
        <StyledTextArea
          placeholder="Type your message here..."
          name="message"
          style={{ minHeight: 200 }}
          onChange={handleChange}
        />
        <ReCAPTCHA sitekey={`${process.env.GATSBY_RECAPTCHA_KEY}`} />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </PageContainer>
  );
};

export default ContactPage;