// emails/OrderConfirmation.tsx
import { OrderWithUserInfos } from "@/lib/schema";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Row,
  Column,
  Img,
  Link,
  Tailwind,
  Hr,
} from "@react-email/components";

export default function ForgotPasswordMail(url: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_URL;

  return (
    <Html>
      <Head />
      <Preview>{`Réinitialisation de votre mot de passe`}</Preview>

      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-2xl bg-white rounded-lg shadow-lg">
            {/* Header avec logo */}
            <Section className="bg-primary px-8 py-10 text-center rounded-t-lg">
              <Img
                alt="Smoke logo"
                height="60"
                src={`${baseUrl}/globe.svg`}
                className="mx-auto"
              />
            </Section>

            {/* Titre */}
            <Section className="px-8 py-6">
              <Heading className="text-2xl font-bold text-center text-gray-900">
                Votre lien de réinitialisation
              </Heading>
            </Section>

            {/* Message de remerciement */}
            <Section className="px-8">
              <Link href={url} className="text-gray-700">
                Réinitialisation
              </Link>
            </Section>

            <Hr className="my-6 border-gray-300" />

            {/* Footer */}
            <Section className="px-8 py-10 bg-gray-100 text-center rounded-b-lg">
              <Text className="text-gray-900 font-semibold text-lg mb-2">
                Smoke
              </Text>
              <Text className="text-gray-600 text-sm mb-4">
                Votre boutique de cigarettes électroniques
              </Text>

              {/* Réseaux sociaux (optionnel, enlève si tu n'en as pas) */}
              <Row className="mb-4">
                <Column align="center">
                  <Link href="#" className="mx-2">
                    <Img
                      alt="Facebook"
                      height="32"
                      width="32"
                      src="https://react.email/static/facebook-logo.png"
                    />
                  </Link>
                  <Link href="#" className="mx-2">
                    <Img
                      alt="Instagram"
                      height="32"
                      width="32"
                      src="https://react.email/static/instagram-logo.png"
                    />
                  </Link>
                </Column>
              </Row>

              <Text className="text-gray-600 text-sm m-0">
                contact@smoke.com
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
