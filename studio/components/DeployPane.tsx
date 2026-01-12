import { useState } from 'react'
import { Button, Card, Stack, Text, useToast, Dialog, Box } from '@sanity/ui'
import { RocketIcon } from '@sanity/icons'

export function DeployPane() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const toast = useToast()

  const handleDeploy = async () => {
    setShowConfirmDialog(false)
    setIsDeploying(true)

    const buildHookUrl = import.meta.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK

    if (!buildHookUrl) {
      toast.push({
        status: 'error',
        title: 'Brak konfiguracji',
        description: 'Zmienna SANITY_STUDIO_NETLIFY_BUILD_HOOK nie jest ustawiona w pliku .env',
      })
      setIsDeploying(false)
      return
    }

    try {
      const response = await fetch(buildHookUrl, {
        method: 'POST',
      })

      if (response.ok) {
        toast.push({
          status: 'success',
          title: 'Sukces',
          description: 'Przebudowa strony została uruchomiona. Może to potrwać kilka minut.',
        })
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Błąd',
        description: `Nie udało się uruchomić przebudowy strony: ${error}`,
      })
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <Card padding={4} sizing="border">
      <Stack space={4}>
        <Text size={2} weight="bold">
          Wdrażanie strony
        </Text>
        <Text size={1} muted>
          Kliknij przycisk poniżej, aby uruchomić przebudowę strony na Netlify.
          Proces ten może potrwać kilka minut.
        </Text>
        <Box>
          <Button
            icon={RocketIcon}
            text={isDeploying ? 'Uruchamianie...' : 'Przebuduj stronę'}
            tone="primary"
            disabled={isDeploying}
            onClick={() => setShowConfirmDialog(true)}
          />
        </Box>
      </Stack>

      {showConfirmDialog && (
        <Dialog
          header="Potwierdzenie"
          id="confirm-deploy-dialog"
          onClose={() => setShowConfirmDialog(false)}
          zOffset={1000}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text>
                Czy na pewno chcesz przebudować stronę? Proces ten może potrwać kilka minut.
              </Text>
              <Stack space={2} direction="row">
                <Button
                  text="Anuluj"
                  mode="ghost"
                  onClick={() => setShowConfirmDialog(false)}
                />
                <Button
                  text="Przebuduj"
                  tone="primary"
                  onClick={handleDeploy}
                />
              </Stack>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Card>
  )
}
