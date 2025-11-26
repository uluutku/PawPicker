import { Container, Typography } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Last updated: November 26, 2025
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        1. Introduction
      </Typography>
      <Typography paragraph>
        PawPicker (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides simple image picking and
        comparison tools to help you choose between different pet images (the
        &quot;Service&quot;). This Privacy Policy explains how we handle any information when
        you use PawPicker on the web and through any PawPicker mobile application
        distributed via app stores such as Google Play or the Apple App Store.
      </Typography>
      <Typography paragraph>
        This Privacy Policy applies to both the PawPicker website and the PawPicker
        mobile applications. By using PawPicker, you agree to the practices described
        here. If you do not agree, please do not use the Service.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        2. Information We Collect
      </Typography>
      <Typography paragraph>
        PawPicker is designed to work entirely without collecting or storing your
        personal data on our servers. We do not require you to create an account, and
        we do not ask for your name, email address, phone number, or any other
        personally identifiable information through the app or website interfaces.
      </Typography>
      <Typography paragraph>
        Specifically:
      </Typography>
      <Typography component="ul" sx={{ pl: 3 }}>
        <Typography component="li" paragraph>
          <strong>No personal account data</strong>: PawPicker does not offer user
          accounts and does not store profile information.
        </Typography>
        <Typography component="li" paragraph>
          <strong>No analytics or tracking profiles</strong>: We do not build user
          profiles, and we do not track your activity across other apps or websites for
          advertising or marketing purposes.
        </Typography>
      </Typography>

      <Typography paragraph>
        If this approach changes in the future (for example, if we add optional
        accounts, analytics, or other features that involve additional data), we will
        update this Privacy Policy and, where required, request your consent before
        any new type of data is collected or processed.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        3. Access to Your Photos and Images
      </Typography>
      <Typography paragraph>
        To provide its core functionality, PawPicker needs access to the images on
        your device (for example, your photo gallery or file system). This access is
        only used so you can pick images to compare inside the app or website.
      </Typography>
      <Typography component="ul" sx={{ pl: 3 }}>
        <Typography component="li" paragraph>
          <strong>Local processing</strong>: Images you select are processed locally in
          your browser or on your device only for the purpose of displaying and
          comparing them.
        </Typography>
        <Typography component="li" paragraph>
          <strong>No upload to our servers</strong>: We do not upload your images to
          our own servers or share them with third parties. They remain on your device
          unless you independently choose to share or upload them elsewhere.
        </Typography>
        <Typography component="li" paragraph>
          <strong>No training or profiling</strong>: We do not use your images to train
          models, build profiles, or for any other secondary purpose.
        </Typography>
      </Typography>
      <Typography paragraph>
        The permissions requested by the PawPicker mobile apps (such as gallery or
        photo library access) are strictly for this limited purpose. PawPicker does
        not access your images in the background when you are not actively using the
        Service.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        4. Legal Bases for Processing (EEA/UK Users)
      </Typography>
      <Typography paragraph>
        Because PawPicker does not collect or store personal data on its own servers,
        the amount of &quot;processing&quot; we perform is very limited. To the extent that
        privacy laws such as the GDPR or UK GDPR apply, our legal bases may include:
      </Typography>
      <Typography component="ul" sx={{ pl: 3 }}>
        <Typography component="li" paragraph>
          <strong>Performance of a contract</strong>: Allowing you to select and compare
          images as requested by you.
        </Typography>
        <Typography component="li" paragraph>
          <strong>Consent</strong>: Your decision to grant the app or website access to
          your photo library or files. You can withdraw this consent at any time
          through your device or browser settings.
        </Typography>
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        5. Cookies and Similar Technologies
      </Typography>
      <Typography paragraph>
        The PawPicker website may use strictly necessary cookies or similar
        technologies to keep the site secure and functioning correctly (for example,
        to maintain basic session state). We do not use cookies to track your activity
        across other sites or to build advertising profiles.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        6. Third-Party Services and App Stores
      </Typography>
      <Typography paragraph>
        PawPicker itself does not use third-party analytics, advertising SDKs, or
        other embedded third-party code that collects personal or sensitive user data
        from within the app. However, when you download or use PawPicker via platforms
        such as Google Play or the Apple App Store, those platforms may process
        information as independent controllers under their own privacy policies.
      </Typography>
      <Typography paragraph>
        We recommend that you review the privacy policies of Google, Apple, and any
        other platform operators you use to understand how they handle your data when
        you access, install, or update PawPicker.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        7. Data Retention
      </Typography>
      <Typography paragraph>
        Because PawPicker does not create user accounts or store your images on our
        own servers, we do not maintain long-term records of your use of the Service.
        Any temporary data used to display and compare images is kept only for as long
        as necessary to provide that functionality within your current session.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        8. Data Sharing and Transfers
      </Typography>
      <Typography paragraph>
        We do not sell your personal information, and we do not share your images with
        third parties for advertising, marketing, or data brokerage purposes. Because
        we do not store your images on our servers, there is no regular transfer of
        your image data to other companies by PawPicker.
      </Typography>
      <Typography paragraph>
        In the rare event that we are legally required to disclose information (for
        example, to comply with a court order or other legal obligation), we will
        limit what we share to only what is necessary to meet that obligation and only
        where applicable law requires it.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        9. Children&apos;s Privacy
      </Typography>
      <Typography paragraph>
        PawPicker is not directed to children under the age of 13 (or the equivalent
        minimum age in your jurisdiction), and it is intended to be used by adults or
        with adult supervision. We do not knowingly collect personal information from
        children in this age group. If we become aware that a child has used the
        Service in a way that results in the collection of personal data, we will take
        steps to delete that information as soon as reasonably possible.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        10. Your Rights and Choices
      </Typography>
      <Typography paragraph>
        Depending on your location, you may have certain rights regarding your personal
        information, including the right to:
      </Typography>
      <Typography component="ul" sx={{ pl: 3 }}>
        <Typography component="li" paragraph>
          Request access to information we hold about you.
        </Typography>
        <Typography component="li" paragraph>
          Request correction or deletion of your information, where applicable.
        </Typography>
        <Typography component="li" paragraph>
          Object to or restrict certain types of processing.
        </Typography>
        <Typography component="li" paragraph>
          Withdraw consent where processing is based on your consent (without
          affecting the lawfulness of processing before withdrawal).
        </Typography>
      </Typography>
      <Typography paragraph>
        To exercise any of these rights, you can contact us using the details provided
        in the &quot;Contact Us&quot; section below. We may ask you to verify your identity
        before responding to your request.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        11. International Transfers
      </Typography>
      <Typography paragraph>
        If you access the Service from outside the country where our servers or
        service providers are located, your information may be transferred across
        international borders. We take steps, where required by law, to ensure that
        such transfers are carried out with appropriate safeguards.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        12. Security
      </Typography>
      <Typography paragraph>
        Because PawPicker does not store your images on our servers, most of the
        security of your images depends on the protections built into your device,
        browser, and operating system. We recommend that you keep your device software
        up to date and use a secure lock screen or password where appropriate.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        13. Changes to This Privacy Policy
      </Typography>
      <Typography paragraph>
        We may update this Privacy Policy from time to time to reflect changes in our
        practices, technologies, legal requirements, or other factors. When we make
        material changes, we will update the &quot;Last updated&quot; date at the top of this
        page, and, where appropriate, provide additional notice within the Service or
        via the relevant app store listing.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
        14. Contact Us
      </Typography>
      <Typography paragraph>
        If you have any questions or concerns about this Privacy Policy or our data
        practices, you can contact us at:
      </Typography>
      <Typography paragraph>
        Email: privacy@pawpicker.app
        <br />
        If you are located in a region with specific privacy regulations (such as the
        EU, UK, or certain U.S. states), you may also have the right to contact your
        local data protection authority about our data practices.
      </Typography>
    </Container>
  );
}


