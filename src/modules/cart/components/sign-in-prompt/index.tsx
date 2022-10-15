import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className="flex items-start justify-between dark:text-white ">
      <div>
        <h2 className="text-xl-semi">Already have an account?</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-400 text-base-regular">
          Sign in for a better experience.
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <a>
            <Button variant="secondary" className="dark:text-white dark:hover:bg-gray-400">Sign in</Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
