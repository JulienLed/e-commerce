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

export default function OrderConfirmation({
  order,
}: {
  order: OrderWithUserInfos;
}) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_URL;

  return (
    <Html>
      <Head />
      <Preview>{`Confirmation de votre commande #${order.id}`}</Preview>

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

            {/* Navigation */}
            <Section className="mt-6 text-center">
              <Link className="text-gray-600 mx-4 no-underline" href={baseUrl}>
                Accueil
              </Link>
              <Link
                className="text-gray-600 mx-4 no-underline"
                href={`${baseUrl}/E-Cigarette`}
              >
                Produits
              </Link>
            </Section>

            {/* Titre */}
            <Section className="px-8 py-6">
              <Heading className="text-2xl font-bold text-center text-gray-900">
                Commande #{order.id} confirmée !
              </Heading>
            </Section>

            {/* Message de remerciement */}
            <Section className="px-8">
              <Text className="text-gray-700">
                Merci pour votre achat, {order.shippingSurname} !
              </Text>
              <Text className="text-gray-700">
                Votre commande a bien été enregistrée. Nous faisons le maximum
                pour que celle-ci vous parvienne dans les meilleurs délais.
              </Text>
            </Section>

            <Hr className="my-6 border-gray-300" />

            {/* Récapitulatif */}
            <Section className="px-8">
              <Text className="text-lg font-semibold text-gray-900 mb-4">
                Récapitulatif de votre commande :
              </Text>

              {/* Header du tableau */}
              <Row className="bg-gray-100 rounded-t-lg">
                <Column className="py-3 px-4 font-semibold text-gray-700 w-1/3">
                  Produit
                </Column>
                <Column className="py-3 px-4 font-semibold text-gray-700 w-1/3">
                  Description
                </Column>
                <Column className="py-3 px-4 font-semibold text-gray-700 w-1/3 text-right">
                  Prix
                </Column>
              </Row>

              {/* Produits */}
              {order.OrderItem.map((item, index) => (
                <Row
                  key={item.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <Column className="py-3 px-4 text-gray-900 w-1/3">
                    {item.Product.name}
                  </Column>
                  <Column className="py-3 px-4 text-gray-600 w-1/3 text-sm">
                    {item.Product.description}
                  </Column>
                  <Column className="py-3 px-4 text-gray-900 w-1/3 text-right">
                    {(item.Product.price / 100).toFixed(2)} €
                  </Column>
                </Row>
              ))}

              {/* Total */}
              <Row className="bg-primary/10 rounded-b-lg border-t-2 border-primary">
                <Column
                  className="py-4 px-4 font-bold text-gray-900"
                  colSpan={2}
                >
                  Total
                </Column>
                <Column className="py-4 px-4 font-bold text-gray-900 text-right">
                  {(order.totalAmount / 100).toFixed(2)} €
                </Column>
              </Row>
            </Section>

            {/* Adresse de livraison */}
            <Section className="px-8 py-6 bg-gray-50 rounded-lg mx-8 my-6">
              <Text className="font-semibold text-gray-900 mb-2">
                Adresse de livraison :
              </Text>
              <Text className="text-gray-700 m-0">
                {order.shippingName} {order.shippingSurname}
              </Text>
              <Text className="text-gray-700 m-0">
                {order.shippingStreet}, {order.shippingNumStreet}
              </Text>
              <Text className="text-gray-700 m-0">
                {order.shippingPostalCode} {order.shippingCity}
              </Text>
            </Section>

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
