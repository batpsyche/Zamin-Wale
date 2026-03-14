/**
 * Frontend expects: resp.results.data for most endpoints, resp.results for upload.
 * List endpoints expect { result: array, pagination: object } inside results.data.
 */
export function successData(res, data, status = 200) {
  return res.status(status).json({ results: { data } });
}

export function successResults(res, payload, status = 200) {
  return res.status(status).json({ results: payload });
}

export function successList(res, result, pagination) {
  return res.status(200).json({
    results: {
      data: {
        result: result ?? [],
        pagination: pagination ?? { next: false },
      },
    },
  });
}

export function errorData(res, message, status = 400) {
  return res.status(status).json({
    results: {
      data: {
        error: message,
      },
    },
  });
}
